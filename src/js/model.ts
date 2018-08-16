import { Todo } from "./interface";
import { EventHub } from "./event-hub";
import { Store } from "./store";
import { RENDER } from "./constant";

/**
 * 数据模型
 */
export class Model {
  constructor(private store: Store) {
    this.onEventHub();
  }

  /**
   * 初始化事件总栈
   */
  private onEventHub() {
    EventHub.$on(RENDER.ADD_TODO, title => {
      const newTodo: Todo = { id: Date.now(), title, completed: false };

      this.create(newTodo);
    });
  }

  /**
   * 增删改查 —— 新增
   * @param todo 根据用户输入，新建的列表项
   */
  private create(todo: Todo) {
    this.store.save(todo);

    EventHub.$emit(RENDER.TODO_ADDED, todo);
  }

  /**
   * 增删改查 —— 查询
   * @param todo 根据用户输入，新建的列表项
   */
  private read(todo: Todo) {}

  /**
   * 增删改查 —— 更新
   * @param todo 用户更新的数据，ID 为必传属性，title 和 completed 为可选。
   */
  private update(todo: Todo) {}

  /**
   * 增删改查 —— 删除
   * @param id 需要删除的列表项的 ID
   */
  private delete(id: number) {}
}
