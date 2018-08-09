import { Model } from "./model";
import { View } from "./view";
import { Todo } from "./interface";

export class Controller {
  constructor(private model: Model, private view: View) {
    this.on();
  }

  // 回调地狱
  private on() {
    this.view.onAddTodo((title: string) => {
      this.model.create(title, (todo: Todo) => {
        this.view.todoAdded(todo);
      });
    });
  }
}
