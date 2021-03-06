import Template from "./template";
import { $, $parent, $on } from "./helpers";
import { Render, ENTER_KEY, ESCAPE_KEY } from "./constants";
import { Todo } from "./interface";

export default class View {
  private $new: HTMLInputElement;
  private $list: HTMLUListElement;
  private $counter: HTMLSpanElement;
  private $clearCompleted: HTMLButtonElement;
  private $main: HTMLElement;
  private $footer: HTMLElement;
  private $toggleAll: HTMLInputElement;

  constructor(private template: Template) {
    this.$new = $(".new-todo");
    this.$list = $(".todo-list");
    this.$counter = $(".todo-count");
    this.$clearCompleted = $(".clear-completed");
    this.$main = $(".main");
    this.$footer = $(".footer");
    this.$toggleAll = $(".toggle-all");
  }

  private getItemId(element) {
    const li = $parent(element, "li");
    return parseInt(li.dataset.id, 10);
  }

  // 监听事件：新增条目
  onAddTodo(handler: (title: string) => void) {
    $on(this.$new, "change", () => {
      handler(this.$new.value);
    });
  }

  // 监听事件：移除条目
  onRemoveTodo(handler: (id: number) => void) {
    $on(
      this.$list,
      "click",
      event => {
        const id = this.getItemId(event.target);
        handler(id);
      },
      { target: ".destroy" }
    );
  }

  // 监听事件：切换条目完成与否
  onToggleTodo(handler: (todo: Todo) => void) {
    $on(
      this.$list,
      "change",
      event => {
        const id = this.getItemId(event.target);
        const completed = event.target.checked;
        handler({ id, completed });
      },
      { target: ".toggle" }
    );
  }

  // 监听事件：切换全部条目的完成与否
  onToggleAllTodo(handler: (status: boolean) => void) {
    $on(this.$toggleAll, "change", event => {
      handler(event.target.checked);
    });
  }

  // 监听事件：编辑条目
  onEditTodo(handler: (id: number) => void) {
    $on(
      this.$list,
      "dblclick",
      event => {
        const id = this.getItemId(event.target);
        handler(id);
      },
      { target: "li label" }
    );
  }

  // 监听事件：完成条目编辑
  onEditTodoDone(handler: (todo: Todo) => void) {
    $on(
      this.$list,
      "blur",
      event => {
        if (!event.target.dataset.iscanceled) {
          const id = this.getItemId(event.target);
          const title = event.target.value;
          handler({ id, title });
        }
      },
      { target: "li .edit", capture: true }
    );

    $on(
      this.$list,
      "keypress",
      event => {
        event.keyCode === ENTER_KEY && event.target.blur();
      },
      { target: "li .edit" }
    );
  }

  // 监听事件：放弃条目编辑
  onEditTodoCancel(handler: (id: number) => void) {
    $on(
      this.$list,
      "keyup",
      event => {
        if (event.keyCode === ESCAPE_KEY) {
          event.target.dataset.iscanceled = true;
          event.target.blur();

          const id = this.getItemId(event.target);
          handler(id);
        }
      },
      { target: "li .edit" }
    );
  }

  // 监听事件：删除所有完成条目
  onRemoveCompleted(handler) {
    $on(this.$clearCompleted, "click", () => {
      handler();
    });
  }

  // 监听事件：页面载入完成
  onLoad(handler) {
    $on(window, "load", () => {
      handler(document.location.hash);
    });
  }

  // 监听事件：路由改变
  onHashChange(handler) {
    $on(window, "hashchange", () => {
      handler(document.location.hash);
    });
  }

  // 渲染页面
  render(command, parameter?) {
    this[command](parameter);
  }

  // 渲染：清理输入框
  private [Render.ClearNewTodo]() {
    this.$new.value = "";
  }

  // 渲染：列表视图可见性
  private [Render.CountentBlockVisibility](visible: boolean) {
    this.$main.hidden = this.$footer.hidden = !visible;
  }

  // 渲染：“清除所有完成项”按钮可见性
  private [Render.ClearCompletedButton](visible: boolean) {
    this.$clearCompleted.hidden = !visible;
  }

  // 渲染：同步“选择全部”表单项
  private [Render.ToggleAll](allChecked: boolean) {
    this.$toggleAll.checked = allChecked;
  }

  // 渲染：列表
  private [Render.ShowEntries](todos) {
    this.$list.innerHTML = this.template.show(todos);
  }

  // 渲染：底部过滤器
  private [Render.SetFilter](currentPage) {
    $<HTMLAnchorElement>(".filters .selected").classList.remove("selected");
    $<HTMLAnchorElement>(`.filters [href="#/${currentPage}"]`).classList.add(
      "selected"
    );
  }

  // 渲染：底部计数
  private [Render.UpdateElementCount](active: number) {
    this.$counter.innerHTML = this.template.todoCounter(active);
  }

  // 渲染：移除一条
  private [Render.RemoveTodo](id: number) {
    const el = $<HTMLLIElement>(`[data-id="${id}"]`);

    el && this.$list.removeChild(el);
  }

  // 渲染：切换完成状态
  private [Render.CompleteTodo](toggleTodo: Todo) {
    const { id, completed } = toggleTodo;

    const todo = $<HTMLLIElement>(`[data-id="${id}"]`);

    /**
     * 当在 'Active' 和 'Completed' 路由时，点击 'toggleAll'.
     * 因强制不刷新 filter，DOM还未就绪，所有这里直接返回，等待最后一并刷新。
     */
    if (!todo) return;

    todo.classList.toggle("completed", completed);

    $<HTMLInputElement>("input", todo).checked = completed;
  }

  // 渲染：编辑条目
  private [Render.EditTodos](todo: Todo) {
    const { id, title } = todo;
    const editing = $<HTMLLIElement>(`[data-id="${id}"]`);

    editing.classList.add("editing");

    const input = document.createElement("input");
    input.className = "edit";

    editing.appendChild(input);
    input.focus();
    input.value = title;
  }

  // 渲染：完成编辑条目
  private [Render.EditTodosDone](todo: Todo) {
    const { id, title } = todo;
    const editing = $<HTMLLIElement>(`[data-id="${id}"]`);
    const input = $<HTMLInputElement>(".edit", editing);

    editing.removeChild(input);
    editing.classList.remove("editing");

    $<HTMLLabelElement>("label", editing).textContent = title;
  }
}
