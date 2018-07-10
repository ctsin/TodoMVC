import { ENTER_KEY, ESCAPE_KEY } from "./constant";

$(() => {
  "use strict";

  const util = {
    uuid() {
      return new Date().getTime();
    },
    pluralize(count, word) {
      return count < 2 ? word : `${word}s`;
    },
    store(namespace, data) {
      if (arguments.length > 1) {
        return localStorage.setItem(namespace, JSON.stringify(data));
      } else {
        const store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
      }
    }
  };

  class App {
    constructor() {
      this.todos = util.store("todos-jquery");

      this.create = this.create.bind(this);
      this.toggleAll = this.toggleAll.bind(this);
      this.destroyCompleted = this.destroyCompleted.bind(this);
      this.toggle = this.toggle.bind(this);
      this.editingMode = this.editingMode.bind(this);
      this.editKeyup = this.editKeyup.bind(this);
      this.update = this.update.bind(this);
      this.destroy = this.destroy.bind(this);

      this.bindEvents();

      new Router({
        "/:filter": function(filter) {
          this.filter = filter;
          this.render();
        }.bind(this)
      }).init("/all");
    }

    render() {
      const todos = this.getFilteredTodos();
      const todoTemplate = todos.map(
        todo => `
          <li class="${todo.completed ? "completed" : ""}" data-id="${todo.id}">
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.completed ? "checked" : ""
              }>
              <label>${todo.title}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.title}">
          </li>
          `
      );
      $(".todo-list").html(todoTemplate);
      $(".main").toggle(!!todos.length);
      $(".toggle-all").prop("checked", !this.getActiveTodos().length);

      this.renderFooter();

      $(".new-todo").focus();

      util.store("todos-jquery", this.todos);
    }

    bindEvents() {
      $(".new-todo").on("keyup", this.create);
      $(".toggle-all").on("change", this.toggleAll);
      $(".footer").on("click", ".clear-completed", this.destroyCompleted);
      $(".todo-list")
        .on("change", ".toggle", this.toggle)
        .on("dblclick", "label", this.editingMode)
        .on("keyup", ".edit", this.editKeyup)
        .on("focusout", ".edit", this.update)
        .on("click", ".destroy", this.destroy);
    }

    getFilteredTodos() {
      if (this.filter === "active") {
        return this.getActiveTodos();
      }

      if (this.filter === "completed") {
        return this.getCompletedTodos();
      }

      return this.todos;
    }

    getActiveTodos() {
      return this.todos.filter(todo => {
        return !todo.completed;
      });
    }

    getCompletedTodos() {
      return this.todos.filter(todo => todo.completed);
    }

    renderFooter() {
      const todoCount = this.todos.length;
      const activeTodoCount = this.getActiveTodos().length;
      const activeTodoWord = util.pluralize(activeTodoCount, "item");
      const completedTodos = todoCount - activeTodoCount;

      const footerTemplate = `
        <span class="todo-count">
          <strong>${activeTodoCount}</strong>
          ${activeTodoWord} left
        </span>
        <ul class="filters">
          <li>
            <a class="${this.filter === "all" ? "selected" : ""}"
            href="#/all">All</a>
          </li>
          <li>
            <a class="${this.filter === "active" ? "selected" : ""}"
            href="#/active">Active</a>
          </li>
          <li>
            <a class="${this.filter === "completed" ? "selected" : ""}"
            href="#/completed">Completed</a>
          </li>
        </ul>
        ${
          completedTodos
            ? `<button class="clear-completed">Clear completed</button>`
            : ""
        }
      `;

      $(".footer")
        .toggle(!!todoCount)
        .html(footerTemplate);
    }

    getIndexFromEl(target) {
      const id = $(target)
        .closest("li")
        .data("id");

      const todos = this.todos;

      let i = todos.length;

      while (i--) {
        if (todos[i].id === id) {
          return i;
        }
      }
    }

    create(e) {
      const $input = $(e.target);
      const val = $input.val().trim();

      if (e.which !== ENTER_KEY || !val) {
        return;
      }

      this.todos.push({
        id: util.uuid(),
        title: val,
        completed: false
      });

      $input.val("");

      this.render();
    }

    toggleAll(e) {
      let isChecked = $(e.target).prop("checked");

      this.todos.forEach(todo => {
        todo.completed = isChecked;
      });

      this.render();
    }

    destroyCompleted() {
      this.todos = this.getActiveTodos();

      this.render();
    }

    toggle(e) {
      let i = this.getIndexFromEl(e.target);

      this.todos[i].completed = !this.todos[i].completed;

      this.render();
    }

    editingMode(e) {
      const $input = $(e.target)
        .closest("li")
        .addClass("editing")
        .find(".edit");
      const tmpStr = $input.val();
      $input.val("");
      $input.val(tmpStr);
      $input.focus();
    }

    editKeyup(e) {
      if (e.which === ENTER_KEY) {
        e.target.blur();
      }

      if (e.which === ESCAPE_KEY) {
        $(e.target)
          .data("abort", true)
          .blur();
      }
    }

    update(e) {
      const el = e.target;
      const $el = $(el);
      const val = $el.val().trim();

      if ($el.data("abort")) {
        $el.data("abort", false);
      } else if (!val) {
        this.destroy(e);
        return;
      } else {
        this.todos[this.getIndexFromEl(el)].title = val;
      }

      this.render();
    }

    destroy(e) {
      this.todos.splice(this.getIndexFromEl(e.target), 1);
      this.render();
    }
  }

  new App();
});
