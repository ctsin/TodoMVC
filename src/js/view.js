import { qs, $on, $delegate } from "./helpers";

const _itemId = el => {
  parseInt(el.parentNode.dataset.id, 10);
};

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default class View {
  /**
   *
   * @param {!Template} template A Template instance
   */
  constructor(template) {
    this.template = template;
    this.$todoList = qs(".todo-list");
    this.$todoItemCounter = qs(".todo-count");
    this.$clearCompleted = qs(".clear-completed");
    this.$main = qs(".main");
    this.$toggleAll = qs(".toggle-all");
    this.$newTodo = qs(".new-todo");
    $delegate(this.$todoList, "li label", "dblclick", target => target);
  }

  showItems(items) {
    this.$todoList.innerHTML = this.template.itemList(items);
  }

  setItemsLeft(itemLeft) {
    this.$todoItemCounter.innerHTML = this.template.itemCounter(itemLeft);
  }

  setClearCompletedButtonVisibility(visible) {
    this.$clearCompleted.style.display = visible ? "block" : "none";
  }

  setCompletedAllCheckbox(checked) {
    this.$toggleAll.checked = !!checked;
  }

  setMainVisibility(visible) {
    this.$main.style.display = visible ? "block" : "none";
  }

  clearNewTodo() {
    this.$newTodo.value = "";
  }

  bindAddItem(handler) {
    $on(this.$newTodo, "change", ({ target }) => {
      const title = target.value.trim();

      if (title) {
        handler(title);
      }
    });
  }
}
