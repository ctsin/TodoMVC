import { qs, $on, $delegate } from "./helpers";

const _itemId = el => parseInt(el.parentNode.dataset.id, 10);

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
    $delegate(this.$todoList, "li label", "dblclick", ({ target }) => {
      this.editItem(target);
    });
  }

  showItems(items) {
    this.$todoList.innerHTML = this.template.itemList(items);
  }

  removeItem(id) {
    const el = qs(`[data-id="${id}"]`);

    if (el) {
      this.$todoList.removeChild(el);
    }
  }

  editItem(target) {
    const listItem = target.parentNode;
    const input = document.createElement("input");

    listItem.classList.add("editing");

    input.className = "edit";
    input.value = target.textContent;

    listItem.appendChild(input);

    input.focus();
  }

  editItemDone(id, title) {
    const listItem = qs(`[data-id="${id}"]`);
    const input = qs("input.edit", listItem);

    listItem.removeChild(input);
    listItem.classList.remove("editing");

    qs("label", listItem).textContent = title;
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

  bindEditItemSave(handler) {
    $delegate(
      this.$todoList,
      "li .edit",
      "blur",
      ({ target }) => {
        if (!target.dataset.iscanceled) {
          handler(_itemId(target), target.value.trim());
        }
      },
      true
    );

    $delegate(this.$todoList, "li .edit", "keypress", ({ target, keyCode }) => {
      if (keyCode === ENTER_KEY) {
        target.blur();
      }
    });
  }

  bindEditItemCancel(handler) {
    $delegate(this.$todoList, "li .edit", "keyup", ({ target, keyCode }) => {
      if (keyCode === ESCAPE_KEY) {
        target.dataset.iscanceled = true;

        target.blur();

        handler(_itemId(target));
      }
    });
  }
}
