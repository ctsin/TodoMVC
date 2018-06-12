(window => {
  "use strict";

  function View(template) {
    this.template = template;

    this.ENTER_KEY = 13;
    this.ESCAPE_KEY = 27;

    this.$todoList = qs(".todo-list");
    this.$todoItemCounter = qs(".todo-count");
    this.$clearCompleted = qs(".clear-completed");
    this.$main = qs(".main");
    this.$footer = qs(".footer");
    this.$toggleAll = qs(".toggle-all");
    this.$newTodo = qs(".new-todo");
  }

  View.prototype._removeItem = function(id) {
    var el = qs(`[data-id="${id}"]`);

    el && this.$todoList.removeChild(el);
  };

  View.prototype._clearCompletedButton = function(completedCount, visible) {
    this.$clearCompleted.innerHTML = this.template.clearCompletedButton(
      completedCount
    );
    this.$clearCompleted.style.display = visible ? "block" : "none";
  };

  View.prototype._setFilter = function(currentPage) {
    qs(".filters .selected").className = "";
    qs(`.filters [href="#/${currentPage}"]`).className = "selected";
  };

  View.prototype._elementComplete = function(id, completed) {
    var listItem = qs(`[data-id="${id}"]`);

    if (!listItem) {
      return;
    }

    listItem.className = completed ? "completed" : "";

    qs("input", listItem).checked = completed;
  };

  View.prototype._editItem = function(id, title) {
    var listItem = qs(`[data-id="${id}"]`);

    if (!listItem) {
      return;
    }

    listItem.className = listItem.className + " editing";

    var input = document.createElement("input");

    input.className = "edit";

    listItem.appendChild(input);
    input.focus();
    input.value = title;
  };

  View.prototype._editItemDone = function(id, title) {
    var listItem = qs(`[data-id="${id}"]`);

    if (!listItem) {
      return;
    }

    var input = qs("input.edit", listItem);

    listItem.removeChild(input);

    listItem.className = listItem.className.replace("editing", "");

    qsa("label", listItem).forEach(label => {
      label.textContent = title;
    });
  };

  View.prototype.render = function(viewCmd, parameter) {
    // todo 如何更优雅地处理 this 呢？
    var _this = this;

    var viewComands = {
      showEntries() {
        _this.$todoList.innerHTML = _this.template.show(parameter);
      },
      removeItem() {
        _this._removeItem(parameter);
      },
      updateElementCount() {
        _this.$todoItemCounter.innerHTML = _this.template.itemCounter(
          parameter
        );
      },
      clearCompletedButton() {
        _this._clearCompletedButton(parameter.completed, parameter.visible);
      },
      contentBlockVisibility() {
        _this.$main.style.display = _this.$footer.style.display = parameter.visible
          ? "block"
          : "none";
      },
      toggleAll() {
        _this.$toggleAll.checked = parameter.checked;
      },
      setFilter() {
        _this._setFilter(parameter);
      },
      clearNewTodo() {
        _this.$newTodo.value = "";
      },
      elementComplete() {
        _this._elementComplete(parameter.id, parameter.completed);
      },
      editItem() {
        _this._editItem(parameter.id, parameter.title);
      },
      editItemDone() {
        _this._editItemDone(parameter.id, parameter.title);
      }
    };

    viewComands[viewCmd]();
  };

  View.prototype._itemId = function(el) {
    var li = $parent(el, "li");

    return parseInt(li.dataset.id, 10);
  };

  View.prototype._bindItemEditDone = function(handler) {
    var _this = this;
    $delegate(_this.$todoList, "li .edit", "blur", function() {
      if (!this.dataset.iscanceled) {
        handler({
          id: _this._itemId(this),
          title: this.value
        });
      }
    });

    $delegate(_this.$todoList, "li .edit", "keypress", function(event) {
      if (event.keyCode === _this.ENTER_KEY) {
        this.blur();
      }
    });
  };

  View.prototype._bindItemEditCancel = function(handler) {
    var _this = this;

    $delegate(_this.$todoList, "li .edit", "keyup", function(event) {
      if (event.keyCode === _this.ESCAPE_KEY) {
        this.dataset.iscanceled = true;

        this.blur();

        handler({ id: _this._itemId(this) });
      }
    });
  };

  View.prototype.bind = function(event, handler) {
    var _this = this;

    if (event === "newTodo") {
      $on(_this.$newTodo, "change", function() {
        handler(_this.$newTodo.value);
      });
    } else if (event === "removeCompleted") {
      $on(_this.$clearCompleted, "click", function() {
        handler();
      });
    } else if (event === "toggleAll") {
      $on(_this.$toggleAll, "click", function() {
        handler({ completed: this.checked });
      });
    } else if (event === "itemEdit") {
      $delegate(_this.$todoList, "li label", "dblclick", function() {
        handler({ id: _this._itemId(this) });
      });
    } else if (event === "itemRemove") {
      $delegate(_this.$todoList, ".destroy", "click", function() {
        handler({ id: _this._itemId(this) });
      });
    } else if (event === "itemToggle") {
      $delegate(_this.$todoList, ".toggle", "click", function() {
        handler({
          id: _this._itemId(this),
          completed: this.checked
        });
      });
    } else if (event === "itemEditDone") {
      _this._bindItemEditDone(handler);
    } else if (event === "itemEditCancel") {
      _this._bindItemEditCancel(handler);
    }
  };

  window.app = window.app || {};
  window.app.View = View;
})(window);
