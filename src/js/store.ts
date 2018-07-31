import { Todo } from "./interface";

// todo 准备使用泛型实现
export default class Store {
  constructor(private name: string = "todomvc-typescript") {
    localStorage[name] = localStorage[name] || JSON.stringify({ todos: [] });
  }

  save(todo: Todo, callback = () => void 0) {
    const data = JSON.parse(localStorage[this.name]);
    const todos: Todo[] = data.todos;

    todo.id = new Date().getTime();

    todos.push(todo);

    localStorage[this.name] = JSON.stringify(data);

    callback();
  }

  find(query, callback) {
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

  // todo 准备与 find 合并
  findAll(callback) {
    if (!callback) return;

    const todos: Todo[] = JSON.parse(localStorage[this.name]).todos;

    callback(todos);
  }

  remove(id, callback = () => void 0) {
    callback();
  }

  drop(callback = () => void 0) {
    callback();
  }
}
