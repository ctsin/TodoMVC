import { emptyItemQuery } from "./item";

export default class Store {
  /**
   *
   * @param {!string} name Database name
   * @param {function()} [callback] Called when the Store is ready
   */
  constructor(name, callback) {
    const localStorage = window.localStorage;
    /**
     * @type {Storage}
     */

    /**
     * @type {ItemList}
     */
    let liveTodos;

    /**
     * @returns {ItemList} Current array of todos
     */
    this.getLocalStorage = () => {
      return liveTodos || JSON.parse(localStorage.getItem(name) || "[]");
    };

    /**
     *
     * @param {ItemList} todos Array of todos to write
     */
    this.setLocalStorage = todos => {
      localStorage.setItem(name, JSON.stringify((liveTodos = todos)));
    };

    if (callback) {
      callback();
    }
  }

  find(query, callback) {
    const todos = this.getLocalStorage();
    let k;

    callback(
      todos.filter(todo => {
        for (k in query) {
          if (query[k] !== todo[k]) {
            return false;
          }
        }

        return true;
      })
    );
  }

  count(callback) {
    this.find(emptyItemQuery, data => {
      const total = data.length;

      let i = total;
      let completed = 0;

      while (i--) {
        completed += data[i].completed;
      }

      callback(total, total - completed, completed);
    });
  }
}
