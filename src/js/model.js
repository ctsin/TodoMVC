(window => {
  "use strict";

  class Model {
    constructor(store) {
      this.store = store;
    }
    create(title = "", callback = data => data) {
      var newItem = {
        title: title.trim(),
        completed: false
      };
      this.store.save(newItem, callback);
    }
    read(query, callback = data => data) {
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
    }
    update(id, data, callback) {
      this.store.save(data, callback, id);
    }
    remove(id, callback) {
      this.store.remove(id, callback);
    }
    removeAll(callback) {
      this.store.reset(callback);
    }
    getCount(callback) {
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
    }
  }

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
