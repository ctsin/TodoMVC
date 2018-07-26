import Model from "./model";
import View from "./view";

export default class Controller {
  private activeRoute: string; // 'All', 'Active' & 'Completed'
  private lastActiveRoute: string; // 'All', 'Active' & 'Completed'

  constructor(private model: Model, private view: View) {
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
      this.view.render("clearNewTodo", title);
      // this.filter(true)
    });
  }

  private removeTodo(id) {}

  private toggleTodo(id, completed) {}

  private toggleAllTodo(completed) {}

  private editTodo(id) {}

  private editTodoDone(id, title) {}

  private editTodoCancel(id) {}

  private removeCompleted() {}

  private showAll() {
    this.model.read(data => {
      this.view.render("showEntries", data);
    });
  }

  private showActive() {}

  private showCompleted() {}

  private filter(force = false) {
    const activeRoute =
      this.activeRoute.charAt(0).toUpperCase() + this.activeRoute.substr(1);

    this[`show${activeRoute}`]();

    this.lastActiveRoute = activeRoute;
  }

  private updateFilterState(currentPage: string) {
    this.activeRoute = currentPage;

    this.activeRoute = this.activeRoute || "All";

    this.filter();

    this.view.render("setFilter", currentPage);
  }

  setView(locationHash: string) {
    const route = locationHash.split("/")[1];
    const page = route || "";

    this.updateFilterState(page);
  }
}
