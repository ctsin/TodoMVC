import Template from "./template";
import { $, $on, $parent, $delegate } from "./helpers";
import { Render } from "./constants";
import { Todo } from "./interface";

export default class View {
  private $new;
  private $list;
  private $counter;
  private $clearCompleted;
  private $main;
  private $footer;
  private $toggleAll;

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
    $delegate(this.$list, ".destroy", "click", event => {
      const id = this.getItemId(event.target);

      handler(id);
    });
  }

  // 监听事件：切换条目完成与否
  onToggleTodo(handler: (todo: Todo) => void) {
    $delegate(this.$list, ".toggle", "change", event => {
      const id = this.getItemId(event.target);
      const completed = event.target.checked;

      handler({ id, completed });
    });
  }

  // 监听事件：切换全部条目的完成与否
  onToggleAllTodo(handler: (status: boolean) => void) {
    $on(this.$toggleAll, "change", event => {
      handler(event.target.checked);
    });
  }

  // 监听事件：编辑条目
  onEditTodo(handler) {}

  // 监听事件：完成条目编辑
  onEditTodoDone(handler) {}

  // 监听事件：放弃条目编辑
  onEditTodoCancel(handler) {}

  // 监听事件：删除所有完成条目
  onRemoveCompleted(handler) {
    $on(this.$clearCompleted, "click", () => {
      handler();
    });
  }

  // 渲染页面
  // todo 准备转为 Render 类型定义
  render(command, parameter?) {
    this[command](parameter);
  }

  // 渲染：清理输入框
  private [Render.ClearNewTodo]() {
    this.$new.value = "";
  }

  // 渲染：列表
  private [Render.ShowEntries](todos) {
    this.$list.innerHTML = this.template.show(todos);
  }

  // 渲染：底部过滤器
  private [Render.SetFilter](currentPage) {
    $(".filters .selected").classList.remove("selected");
    $(`.filters [href="#/${currentPage}"]`).classList.add("selected");
  }

  // 渲染：底部计数
  private [Render.UpdateElementCount](active: number) {
    this.$counter.innerHTML = this.template.todoCounter(active);
  }

  // 渲染：移除一条
  private [Render.RemoveTodo](id: number) {
    const el = $(`[data-id="${id}"]`);

    el && this.$list.removeChild(el);
  }

  // 渲染：切换完成状态
  private [Render.CompleteTodo](toggleTodo: Todo) {
    const { id, completed } = toggleTodo;

    const todo = $(`[data-id="${id}"]`);

    todo.classList.toggle("completed", completed);

    $("input", todo).checked = completed;
  }
}
