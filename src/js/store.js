(window => {
  "use strict";

  /**
   * @param {string} name The name of our DB we want to use
   * @param {function} callback Fake DB callback
   */
  class Store {
    constructor(name, callback = () => {}) {
      this._db = name;
      if (!localStorage[name]) {
        var data = {
          todos: []
        };
        localStorage[name] = JSON.stringify(data);
      }
      callback.call(this, JSON.parse(localStorage[name]));
    }
    /**
     * @param {object} query The query to match against
     * @param {function} callback The callback to fire when the query has completed running.
     *
     * @example
     * db.find({foo: 'bar', hello: 'world'}, (data) => {
     * // Operation on callback
     * });
     */
    find(query, callback) {
      if (!callback) {
        return;
      }
      var todos = JSON.parse(localStorage[this._db]).todos;
      callback.call(
        this,
        todos.filter(todo => {
          for (var q in query) {
            if (query[q] !== todo[q]) {
              return false;
            }
          }
          return true;
        })
      );
    }
    all(callback = () => {}) {
      callback.call(this, JSON.parse(localStorage[this._db]).todos);
    }
    save(updateData, callback = () => {}, id) {
      var data = JSON.parse(localStorage[this._db]);
      var todos = data.todos;
      if (id) {
        for (var i = 0; i < todos.length; i++) {
          if (todos[i].id === id) {
            for (var key in updateData) {
              todos[i][key] = updateData[key];
            }
            break;
          }
        }
        localStorage[this._db] = JSON.stringify(data);
        callback.call(this, todos);
      } else {
        updateData.id = new Date().getTime();
        todos.push(updateData);
        localStorage[this._db] = JSON.stringify(data);
        // ? 为什么传数组
        callback.call(this, [updateData]);
      }
    }
    remove(id, callback) {
      var data = JSON.parse(localStorage[this._db]);
      var todos = data.todos;
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
          todos.splice(i, 1);
          break;
        }
      }
      localStorage[this._db] = JSON.stringify(data);
      callback.call(this, todos);
    }
    reset(callback) {
      var data = { todos: [] };
      localStorage[this._db] = JSON.stringify(data);
      callback.call(this, data.todos);
    }
  }

  window.app = window.app || {};

  window.app.Store = Store;
})(window);
