import Store from "./store";
import { Todo } from "./interface";

export default class Model {
  constructor(private store: Store) {}

  create(title: string = "", callback = () => void 0) {
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
        return this.store.findAll(callback);
      case "string" || "number":
        query = parseInt(query, 10);
        this.store.find({ id: query }, callback);
      default:
        this.store.find(query, callback);
    }
  }

  update(title, callback) {}

  delete(title, callback) {}

  getCount(title, callback) {}
}
