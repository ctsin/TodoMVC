import Model from "./model";
import View from "./view";
import { Render } from "./constants";

export default class Controller {
  private activeRoute: string;
  private lastActiveRoute: string;

  constructor(private model: Model, private view: View) {
    this.activeRoute = "";
    this.lastActiveRoute = "";

    this.on();
  }

  // 监听 DOM 事件
  private on() {
    this.view.addTodo(({ title }) => {
      this.addTodo(title);
    });

    this.view.removeTodo(({ id }) => {
      this.removeTodo(id);
    });

    this.view.toggleTodo(({ id, completed }) => {
      this.toggleTodo(id, completed);
    });

    this.view.toggleAllTodo(({ completed }) => {
      this.toggleAllTodo(completed);
    });

    this.view.editTodo(({ id }) => {
      this.editTodo(id);
    });

    this.view.editTodoDone(({ id, title }) => {
      this.editTodoDone(id, title);
    });

    this.view.editTodoCancel(({ id }) => {
      this.editTodoCancel(id);
    });

    this.view.removeCompleted(() => {
      this.removeCompleted();
    });
  }

  private addTodo(title) {
    if (title.trim() === "") return;

    this.model.create(title, () => {
      this.view.render(Render.ClearNewTodo);

      // todo 准备 传入 true
      this.filter();
    });
  }

  private removeTodo(id) {}

  private toggleTodo(id, completed) {}

  private toggleAllTodo(completed) {}

  private editTodo(id) {}

  private editTodoDone(id, title) {}

  private editTodoCancel(id) {}

  private removeCompleted() {}

  public setView(locationHash: string) {
    const route = locationHash.split("/")[1];
    const page = route || "";

    this.updateFilterState(page);
  }

  private updateFilterState(currentPage) {
    this.activeRoute = currentPage;

    this.activeRoute = this.activeRoute || "All";

    this.filter();

    this.view.render(Render.SetFilter, currentPage);
  }

  private filter(force = false) {
    const activeRoute =
      this.activeRoute.charAt(0).toUpperCase() + this.activeRoute.substr(1);

    this.updateCount();

    // todo 仔细思考原文一系列判断是何用意
    this[`show${activeRoute}`]();

    this.lastActiveRoute = activeRoute;
  }

  private updateCount() {
    this.model.getCount((active: number) => {
      this.view.render(Render.UpdateElementCount, active);
    });
  }

  private showAll() {
    this.model.read(data => {
      this.view.render(Render.ShowEntries, data);
    });
  }

  private showActive() {
    this.model.read({ completed: false }, data => {
      this.view.render(Render.ShowEntries, data);
    });
  }

  private showCompleted() {
    this.model.read({ completed: true }, data => {
      this.view.render(Render.ShowEntries, data);
    });
  }
}
