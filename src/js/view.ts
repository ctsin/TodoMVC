import Template from "./template";
import { $, $on, $parent } from "./helpers";

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

  // 新增条目
  addTodo(handler) {
    $on(this.$new, "change", () => {
      handler({ title: this.$new.value });
    });
  }

  // 移除条目
  removeTodo(handler) {
    $on(this.$clearCompleted, "click", event => {
      const id = this.getItemId(event.target);
      handler({ id });
    });
  }

  // 切换条目完成与否
  toggleTodo(handler) {}

  // 切换全部条目的完成与否
  toggleAllTodo(handler) {}

  // 编辑条目
  editTodo(handler) {}

  // 完成条目编辑
  editTodoDone(handler) {}

  // 放弃条目编辑
  editTodoCancel(handler) {}

  // 删除所有完成条目
  removeCompleted(handler) {}

  // 渲染页面
  render(command: string, parameter) {
    this[command](parameter);
  }

  private clearNewTodo(parameter) {
    this.$new.value = "";
  }

  private showEntries(todos) {
    this.$list.innerHTML = this.template.show(todos);
  }

  private setFilter(currentPage) {}
}