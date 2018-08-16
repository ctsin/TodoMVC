import { Todo } from "./interface";

/**
 * 假装数据持久化
 */
export class Store {
  /**
   * 存入数据库
   * @param todo 经 Model 加工过的数据
   */
  save(todo: Todo) {
    return this.query()
      .then(todos => {
        todos.push(todo);
        return todos;
      })
      .then(todos => {
        localStorage.setItem("todos", JSON.stringify(todos));
      });
  }

  /**
   * 查询数据库
   */
  query() {
    return new Promise((resolve: (T: Todo[]) => void) => {
      const todos: Todo[] = JSON.parse(localStorage.getItem("todos")) || [];
      resolve(todos);
    });
  }
}
