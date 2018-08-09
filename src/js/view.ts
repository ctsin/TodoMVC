import $ from "jquery";
import { Render, ENTER_KEY } from "./constant";
import { Todo } from "./interface";

export class View {
  private $newTodo: JQuery;
  private $completeTodo: JQuery;
  private $deleteTodo: JQuery;
  private $todosContainer: JQuery;

  constructor() {
    this.$newTodo = $(".new-todo");
    this.$completeTodo = $(".complete-todo");
    this.$deleteTodo = $(".delete-todo");
    this.$todosContainer = $(".todos-container");
  }

  // 注册浏览器事件：新增
  onAddTodo(callback: (title: string) => void) {
    this.$newTodo.on("keypress", event => {
      if (event.keyCode !== ENTER_KEY) return;

      const input: string = String($(event.target).val());
      callback(input);
    });
  }

  todoAdded(todo: Todo) {
    const { id, title, completed } = todo;
    const item = `
      <li>${title}</li>
    `;

    this.$newTodo.val("").focus();
    this.$todosContainer.append(item);
  }
}
