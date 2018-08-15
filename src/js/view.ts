import $ from "jquery";
import { RENDER, ENTER_KEY } from "./constant";
import { Todo } from "./interface";
import { EventHub } from "./event-hub";
import { Template } from "./template";

/**
 * 视图
 */
export class View {
  private $newTodo: JQuery;
  private $todosContainer: JQuery;

  constructor(private template: Template) {
    this.$newTodo = $(".new-todo");
    this.$todosContainer = $(".todos-container");

    this.onDOMEvent();

    this.onEventHub();
  }

  /**
   * 初始化 DOM 事件
   */
  private onDOMEvent() {
    this.onAddTodo();
  }

  /**
   * 注册 DOM 事件：新增
   */
  private onAddTodo() {
    this.$newTodo.on("keypress", event => {
      if (event.keyCode !== ENTER_KEY) return;

      const title: string = String($(event.target).val());

      EventHub.$emit(RENDER.ADD_TODO, title);
    });
  }

  /**
   * 初始化事件总栈
   */
  private onEventHub() {
    EventHub.$on(RENDER.TODO_ADDED, (todo: Todo) => {
      this.todoAdded(todo);
    });
  }

  /**
   * 渲染视图：新增
   */
  private todoAdded(todo: Todo) {
    const newTodo = this.template.renderTodoAdded(todo);

    this.$newTodo.val("").focus();
    this.$todosContainer.prepend(newTodo);
  }
}
