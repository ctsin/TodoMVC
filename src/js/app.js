(() => {
  "use strict";

  /**
   * Sets up a brand new Todo list
   *
   * @param {string} name The name of your new todo list.
   */
  function Todo(name) {
    this.store = new app.Store(name);
    this.model = new app.Model(this.store);
    this.template = new app.Template();
    this.view = new app.View(this.template);
    this.controller = new app.Controller(this.model, this.view);
  }

  var todo = new Todo("todos-vanillajs");

  function setView() {
    todo.controller.setView(document.location.hash);
  }
  $on(window, "load", setView);
  $on(window, "hashchange", setView);
})();
