(window => {
  "use strict";

  function Model(store) {
    this.store = store;
  }

  Model.prototype.create = function(title = "", callback = () => {}) {
    var newItem = {
      title: title.trim(),
      completed: false
    };

    this.store.save(newItem, callback);
  };

  Model.prototype.read = function(query, callback = () => {}) {
    var queryType = typeof query;

    if (queryType === "function") {
      callback = query;

      return this.store.all(callback);
    } else if (queryType === "string" || queryType === "number") {
      query = parseInt(query, 10);
      this.store.find({ id: query }, callback);
    } else {
      this.store.find(query, callback);
    }
  };

  Model.prototype.update = function(id, data, callback) {
    this.store.save(data, callback, id);
  };

  Model.prototype.remove = function(id, callback) {
    this.store.remove(id, callback);
  };

  Model.prototype.removeAll = function(callback) {
    this.store.reset(callback);
  };

  Model.prototype.getCount = function(callback) {
    var todos = {
      active: 0,
      completed: 0,
      total: 0
    };

    this.store.all(data => {
      data.forEach(todo => {
        if (todo.completed) {
          todos.completed++;
        } else {
          todos.active++;
        }

        todos.total++;
      });

      callback(todos);
    });
  };

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
