import { Todo } from "./interface";

export default class Store {
  constructor(private name: string = "todomvc-typescript") {
    localStorage[name] = localStorage[name] || JSON.stringify({ todos: [] });
  }

  save(todo: Todo, callback = () => void 0) {
    const data = JSON.parse(localStorage[this.name]);
    const todos: Todo[] = data.todos;
    const { id } = todo;

    if (id) {
      for (let i = 0, length = todos.length; i < length; i++) {
        if (todos[i].id === id) {
          for (let key in todo) {
            todos[i][key] = todo[key];
          }

          break;
        }
      }

      localStorage[this.name] = JSON.stringify(data);

      callback();
    } else {
      todo.id = Date.now();
      todos.push(todo);
      localStorage[this.name] = JSON.stringify(data);

      callback();
    }
  }

  find(query, callback: (todos: Todo[]) => void) {
    if (!callback) return;

    const todos: Todo[] = JSON.parse(localStorage[this.name]).todos;

    const filter = todos.filter(todo => {
      for (const q in query) {
        if (query[q] !== todo[q]) return false;
      }

      return true;
    });

    callback(filter);
  }

  all(callback: (todos: Todo[]) => void) {
    if (!callback) return;

    const todos: Todo[] = JSON.parse(localStorage[this.name]).todos;

    callback(todos);
  }

  remove(id, callback: () => void) {
    const data = JSON.parse(localStorage[this.name]);
    const todos: Todo[] = data.todos;

    for (let i = 0, length = todos.length; i < length; i++) {
      if (todos[i].id === id) {
        todos.splice(i, 1);
        break;
      }
    }

    localStorage[this.name] = JSON.stringify(data);

    callback();
  }
}
