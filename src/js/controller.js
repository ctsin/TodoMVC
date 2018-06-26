import { emptyItemQuery } from "./item";

export default class Controller {
  constructor(store, view) {
    this.store = store;
    this.view = view;

    this.view.bindAddItem(this.addItem.bind(this));

    this._activeRoute = "";
    this._lastActiveRoute = null;
  }

  setView(raw) {
    const route = raw.replace(/^#\//, "");
    this._activeRoute = route;
    this._filter();
  }

  /**
   *
   * @param {!string} title Title of the new item
   */
  addItem(title) {
    this.store.insert(
      {
        id: Date.now(),
        title,
        completed: false
      },
      () => {
        this.view.clearNewTodo();
        this._filter(true);
      }
    );
  }

  _filter(force) {
    const route = this._activeRoute;

    if (
      force ||
      this._lastActiveRoute !== "" ||
      this._lastActiveRoute !== route
    ) {
      this.store.find(
        {
          "": emptyItemQuery,
          active: { completed: false },
          completed: { completed: true }
        }[route],
        this.view.showItems.bind(this.view)
      );
    }

    this.store.count((total, active, completed) => {
      this.view.setItemsLeft(active);
      this.view.setClearCompletedButtonVisibility(completed);
      this.view.setCompletedAllCheckbox(completed === total);
      this.view.setMainVisibility(total);
    });

    this._lastActiveRoute = route;
  }
}
