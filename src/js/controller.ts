import Model from "./model";
import View from "./view";
import { Render } from "./constants";
import { Todo, TodosCount } from "./interface";

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
    this.view.onAddTodo(title => {
      this.addTodo(title);
    });

    this.view.onRemoveTodo(id => {
      this.removeTodo(id);
    });

    this.view.onToggleTodo(todoToggled => {
      this.toggleTodo(todoToggled);
    });

    this.view.onToggleAllTodo(status => {
      this.toggleAllTodo(status);
    });

    this.view.onEditTodo(id => {
      this.editTodo(id);
    });

    this.view.onEditTodoDone((todo: Todo) => {
      this.editTodoDone(todo);
    });

    this.view.onEditTodoCancel(id => {
      this.editTodoCancel(id);
    });

    this.view.onRemoveCompleted(() => {
      this.removeCompleted();
    });

    this.view.onHashChange(hash => {
      this.setView(hash);
    });

    this.view.onLoad(hash => {
      this.setView(hash);
    });
  }

  private addTodo(title: string) {
    if (title.trim() === "") return;

    this.model.create(title, () => {
      this.view.render(Render.ClearNewTodo);

      this.filter(true);
    });
  }

  private removeTodo(id: number) {
    this.model.delete(id, () => {
      this.view.render(Render.RemoveTodo, id);
    });

    this.filter();
  }

  private toggleTodo(todoToggled: Todo, silent = false) {
    this.model.update(todoToggled, () => {
      this.view.render(Render.CompleteTodo, todoToggled);
    });

    !silent && this.filter();
  }

  private toggleAllTodo(completed: boolean) {
    this.model.read({ completed: !completed }, (todos: Todo[]) => {
      todos.forEach(todo => {
        const { id, completed } = todo;

        this.toggleTodo({ id, completed: !completed }, true);
      });
    });

    this.filter();
  }

  private editTodo(id) {
    this.model.read(id, (todo: Todo[]) => {
      const title = todo[0].title;

      this.view.render(Render.EditTodos, { id, title });
    });
  }

  private editTodoDone(todo: Todo) {
    let { id, title } = todo;

    title = title.trim();

    if (title.length !== 0) {
      this.model.update({ id, title }, () => {
        this.view.render(Render.EditTodosDone, { id, title });
      });
    } else {
    }
  }

  private editTodoCancel(id: number) {
    this.model.read(id, (todo: Todo) => {
      const title = todo[0].title;

      this.view.render(Render.EditTodosDone, { id, title });
    });
  }

  private removeCompleted() {
    this.model.read({ completed: true }, (todos: Todo[]) => {
      todos.forEach(todo => {
        const { id } = todo;

        this.removeTodo(id);
      });
    });

    this.filter();
  }

  private setView(locationHash: string) {
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

    if (
      force ||
      this.lastActiveRoute !== "All" ||
      this.lastActiveRoute !== activeRoute
    ) {
      this[`show${activeRoute}`]();
    }

    this.lastActiveRoute = activeRoute;
  }

  private updateCount() {
    this.model.getCount((todosCount: TodosCount) => {
      const { active, completed, total } = todosCount;

      this.view.render(Render.UpdateElementCount, active);
      this.view.render(Render.ClearCompletedButton, completed > 0);
      this.view.render(Render.ToggleAll, completed === total);
      this.view.render(Render.CountentBlockVisibility, total > 0);
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
