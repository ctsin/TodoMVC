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
    this.view.onAddTodo(({ title }) => {
      this.addTodo(title);
    });

    this.view.onRemoveTodo(id => {
      this.removeTodo(id);
    });

    this.view.onToggleTodo(({ id, completed }) => {
      this.toggleTodo(id, completed);
    });

    this.view.onToggleAllTodo(({ completed }) => {
      this.toggleAllTodo(completed);
    });

    this.view.onEeditTodo(({ id }) => {
      this.editTodo(id);
    });

    this.view.onEditTodoDone(({ id, title }) => {
      this.editTodoDone(id, title);
    });

    this.view.onEditTodoCancel(({ id }) => {
      this.editTodoCancel(id);
    });

    this.view.onRemoveCompleted(() => {
      this.removeCompleted();
    });
  }

  private addTodo(title) {
    if (title.trim() === "") return;

    this.model.create(title, () => {
      this.view.render(Render.ClearNewTodo);

      this.filter(true);
    });
  }

  private removeTodo(id) {
    this.model.delete(id, () => {
      this.view.render(Render.RemoveTodo, id);
    });

    this.filter();
  }

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

    // todo 尚欠缺 this.lastActiveRoute !== 'All' 判断
    if (force || this.lastActiveRoute !== activeRoute) {
      this[`show${activeRoute}`]();
    }

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
