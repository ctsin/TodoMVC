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

    this.showEntries(title);
  }

  private removeTodo(id) {}

  private toggleTodo(id, completed) {}

  private toggleAllTodo(completed) {}

  private editTodo(id) {}

  private editTodoDone(id, title) {}

  private editTodoCancel(id) {}

  private removeCompleted() {}

  private showEntries(todos) {
    this.model.read(todos, data => {
      this.view.render("showEntries", data);
    });
  }

  private updateFilterState(currentPage) {
    this.activeRoute = currentPage;

    this.activeRoute = this.activeRoute || "All";

    this.view.render("setFilter", currentPage);

    this.lastActiveRoute = this.activeRoute;
  }

  public setView(locationHash: string) {
    const route = locationHash.split("/")[1];
    const page = route || "";

    const filter = {
      "": {},
      active: { completed: false },
      completed: { completed: true }
    };

    this.showEntries(filter[this.activeRoute]);

    this.updateFilterState(page);
  }
}
