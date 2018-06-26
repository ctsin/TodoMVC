import { emptyItemQuery, ItemUpdate, Item, ItemQuery } from "./item";

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

  /**
   *
   * @param {ItemUpdate} update Record with an id, and a property to update
   * @param {function()} [callback] Called when partialRecord is applied
   */
  update(update, callback) {
    const id = update.id;
    const todos = this.getLocalStorage();

    let i = todos.length;
    let k;

    while (i--) {
      if (todos[i].id === id) {
        for (k in update) {
          todos[i][k] = update[k];
        }
        break;
      }
    }

    this.setLocalStorage(todos);

    if (callback) {
      callback();
    }
  }

  /**
   *
   * @param {Item} item Item to insert
   * @param {function()} [callback] Called when item is insert
   */
  insert(item, callback) {
    const todos = this.getLocalStorage();
    todos.push(item);
    this.setLocalStorage(todos);

    if (callback) {
      callback();
    }
  }

  /**
   *
   * @param {ItemQuery} query Query matching the items to remove
   * @param {function(ItemList)|function()} callback Called when records matching query are removed
   */
  remove(query, callback) {
    let k;

    const todos = this.getLocalStorage().filter(todo => {
      for (k in query) {
        if (query[k] !== todo[k]) {
          return true;
        }
      }

      return false;
    });

    this.setLocalStorage(todos);

    if (callback) {
      callback();
    }
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
