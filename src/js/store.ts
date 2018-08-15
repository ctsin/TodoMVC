import { Todo } from "./interface";
import { EventHub } from "./event-hub";
import { RENDER } from "./constant";

/**
 * 假装数据持久化
 */
export class Store {
  /**
   * 存入数据库
   * @param todo 经 Model 加工过的数据
   */
  save(todo: Todo) {
    const data: Todo[] = this.query();

    data.push(todo);
    localStorage.setItem("todos", JSON.stringify(data));

    EventHub.$emit(RENDER.TODO_ADDED, todo);
  }

  /**
   * 查询数据库
   */
  query() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }
}
