$(() => {
  "use strict";

  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;

  Handlebars.registerHelper("eq", function(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  });

  const util = {
    uuid() {
      return new Date().getTime();
    },
    pluralize(count, word) {
      return count === 1 ? word : `${word}s`;
    },
    store(namespace, data) {
      if (arguments.length > 1) {
        return localStorage.setItem(namespace, JSON.stringify(data));
      } else {
        var store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
      }
    }
  };

  const APP = {
    init() {
      this.todos = util.store("todos-jquery");
      this.todoTemplate = Handlebars.compile($("#todo-template").html());
      this.footerTemplate = Handlebars.compile($("#footer-template").html());
      this.bindEvents();

      new Router({
        "/:filter": function(filter) {
          this.filter = filter;
          this.render();
        }.bind(this)
      }).init("/all");
    },

    render() {
      var todos = this.getFilteredTodos();
      $(".todo-list").html(this.todoTemplate(todos));
      $(".main").toggle(!!todos.length);
      $(".toggle-all").prop("checked", !this.getActiveTodos().length);

      this.renderFooter();

      $(".new-todo").focus();

      util.store("todos-jquery", this.todos);
    },

    bindEvents() {
      $(".new-todo").on("keyup", this.create.bind(this));
      $(".toggle-all").on("change", this.toggleAll.bind(this));
      $(".footer").on(
        "click",
        ".clear-completed",
        this.destroyCompleted.bind(this)
      );
      $(".todo-list")
        .on("change", ".toggle", this.toggle.bind(this))
        .on("dblclick", "label", this.editingMode.bind(this))
        .on("keyup", ".edit", this.editKeyup.bind(this))
        .on("focusout", ".edit", this.update.bind(this))
        .on("click", ".destroy", this.destroy.bind(this));
    },

    getFilteredTodos() {
      if (this.filter === "active") {
        return this.getActiveTodos();
      }

      if (this.filter === "completed") {
        return this.getCompletedTodos();
      }

      return this.todos;
    },

    getActiveTodos() {
      return this.todos.filter(todo => {
        return !todo.completed;
      });
    },

    getCompletedTodos() {
      return this.todos.filter(todo => todo.completed);
    },

    renderFooter() {
      const todoCount = this.todos.length;
      const activeTodoCount = this.getActiveTodos().length;
      const template = this.footerTemplate({
        activeTodoCount,
        activeTodoWord: util.pluralize(activeTodoCount, "条"),
        completedTodos: todoCount - activeTodoCount,
        filter: this.filter
      });

      $(".footer")
        .toggle(!!todoCount)
        .html(template);
    },

    getIndexFromEl(target) {
      var id = $(target)
        .closest("li")
        .data("id");

      var todos = this.todos;

      var i = todos.length;

      while (i--) {
        if (todos[i].id === id) {
          return i;
        }
      }
    },

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
    },

    toggleAll(e) {
      let isChecked = $(e.target).prop("checked");

      this.todos.forEach(todo => {
        todo.completed = isChecked;
      });

      this.render();
    },

    destroyCompleted() {
      this.todos = this.getActiveTodos();

      this.render();
    },

    toggle(e) {
      let i = this.getIndexFromEl(e.target);

      this.todos[i].completed = !this.todos[i].completed;

      this.render();
    },

    editingMode(e) {
      const $input = $(e.target)
        .closest("li")
        .addClass("editing")
        .find(".edit");
      const tmpStr = $input.val();
      $input.val("");
      $input.val(tmpStr);
      $input.focus();
    },

    editKeyup(e) {
      if (e.which === ENTER_KEY) {
        e.target.blur();
      }

      if (e.which === ESCAPE_KEY) {
        $(e.target)
          .data("abort", true)
          .blur();
      }
    },

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
    },

    destroy(e) {
      this.todos.splice(this.getIndexFromEl(e.target), 1);
      this.render();
    }
  };

  APP.init();
});
