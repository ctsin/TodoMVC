import { Todo } from "./interface";

export class Model {
  private store: Todo[];

  constructor() {
    this.store = [];
  }

  create(title: string, callback: (todo: Todo) => void) {
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    this.store.push(newTodo);

    callback(newTodo);
  }
}
