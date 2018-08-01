import Store from "./store";
import { Todo, todosCount } from "./interface";

export default class Model {
  constructor(private store: Store) {}

  create(title: string, callback: () => void) {
    const newTodo: Todo = {
      title,
      completed: false
    };

    this.store.save(newTodo, callback);
  }

  read(query, callback?) {
    const queryType = typeof query;

    switch (queryType) {
      case "function":
        callback = query;
        this.store.findAll(callback);
      case "string" || "number":
        query = parseInt(query, 10);
        this.store.find({ id: query }, callback);
      default:
        this.store.find(query, callback);
    }
  }

  update(id: number, callback: () => void) {}

  delete(id: number, callback: () => void) {
    this.store.remove(id, callback);
  }

  getCount(callback: (active: number) => void) {
    const todosCount: todosCount = {
      active: 0,
      completed: 0,
      total: 0
    };

    this.store.findAll(data => {
      data.forEach(todo => {
        todo.completed ? todosCount.completed++ : todosCount.active++;
        todosCount.total++;
      });
    });

    callback(todosCount.active);
  }
}
