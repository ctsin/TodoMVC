(window => {
  "use strict;";

  function Controller(model, view) {
    this.model = model;
    this.view = view;

    this.view.bind("newTodo", title => {
      this.addItem(title);
    });

    this.view.bind("itemEdit", item => {
      this.editItem(item.id);
    });

    this.view.bind("itemEditDone", item => {
      this.editItemSave(item.id, item.title);
    });

    this.view.bind("itemEditCancel", item => {
      this.editItemCancel(item.id);
    });

    this.view.bind("itemRemove", item => {
      this.removeItem(item.id);
    });

    this.view.bind("itemToggle", item => {
      this.toggleComplete(item.id, item.completed);
    });

    this.view.bind("removeCompleted", () => {
      this.removeCompletedItems();
    });

    this.view.bind("toggleAll", status => {
      this.toggleAll(status.completed);
    });
  }

  Controller.prototype.setView = function(locationHash) {
    var route = locationHash.split("/")[1];
    var page = route || "";

    this._updateFilterState(page);
  };

  Controller.prototype.showAll = function() {
    this.model.read(data => {
      this.view.render("showEntries", data);
    });
  };

  Controller.prototype.showActive = function() {
    this.model.read({ completed: false }, data => {
      this.view.render("showEntries", data);
    });
  };

  Controller.prototype.showCompleted = function() {
    this.model.read({ completed: true }, data => {
      this.view.render("showEntries", data);
    });
  };

  Controller.prototype.addItem = function(title) {
    if (title.trim() === "") {
      return;
    }

    this.model.create(title, () => {
      this.view.render("clearNewTodo");
      this._filter(true);
    });
  };

  Controller.prototype.editItem = function(id) {
    this.model.read(id, data => {
      this.view.render("editItem", { id, title: data[0].title });
    });
  };

  Controller.prototype.editItemSave = function(id, title) {
    title = title.trim();

    if (title.length !== 0) {
      this.model.update(id, { title }, () => {
        this.view.render("editItemDone", { id, title });
      });
    } else {
      this.removeItem(id);
    }
  };

  Controller.prototype.editItemCancel = function(id) {
    this.model.read(id, data => {
      this.view.render("editItemDone", { id, title: data[0].title });
    });
  };

  Controller.prototype.removeItem = function(id) {
    this.model.remove(id, () => {
      this.view.render("removeItem", id);
    });

    this._filter();
  };

  Controller.prototype.removeCompletedItems = function() {
    this.model.read({ completed: true }, data => {
      data.forEach(item => {
        this.removeItem(item.id);
      });
    });

    this._filter();
  };

  Controller.prototype.toggleComplete = function(id, completed, silent) {
    this.model.update(id, { completed }, () => {
      this.view.render("elementComplete", {
        id,
        completed
      });
    });

    !silent && this._filter();
  };

  Controller.prototype.toggleAll = function(completed) {
    var _this = this;

    this.model.read({ completed: !completed }, data => {
      data.forEach(item => {
        _this.toggleComplete(item.id, completed, true);
      });
    });

    this._filter();
  };

  Controller.prototype._updateCount = function() {
    this.model.getCount(todos => {
      this.view.render("updateElementCount", todos.active);

      this.view.render("clearCompletedButton", {
        completed: todos.completed,
        visible: todos.completed > 0
      });

      this.view.render("toggleAll", {
        checked: todos.completed === todos.total
      });

      this.view.render("contentBlockVisibility", { visible: todos.total > 0 });
    });
  };

  Controller.prototype._filter = function(force) {
    var activeRoute =
      this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

    this._updateCount();

    if (
      force ||
      this._lastActiveRoute !== "All" ||
      this._lastActiveRoute !== activeRoute
    ) {
      this["show" + activeRoute]();
    }

    this._lastActiveRoute = activeRoute;
  };

  Controller.prototype._updateFilterState = function(currentPage) {
    this._activeRoute = currentPage;

    if (currentPage === "") {
      this._activeRoute = "All";
    }

    this._filter();

    this.view.render("setFilter", currentPage);
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
