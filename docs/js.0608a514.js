// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"..\\node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"..\\node_modules\\parcel-bundler\\src\\builtins\\css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"..\\node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js"}],"..\\node_modules\\todomvc-app-css\\index.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"..\\node_modules\\parcel-bundler\\src\\builtins\\css-loader.js"}],"js\\store.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var Store = /** @class */function () {
    function Store(name) {
        if (name === void 0) {
            name = "todomvc-typescript";
        }
        this.name = name;
        localStorage[name] = localStorage[name] || JSON.stringify({ todos: [] });
    }
    Store.prototype.save = function (todo, callback) {
        if (callback === void 0) {
            callback = function callback() {
                return void 0;
            };
        }
        var data = JSON.parse(localStorage[this.name]);
        var todos = data.todos;
        var id = todo.id;
        if (id) {
            for (var i = 0, length = todos.length; i < length; i++) {
                if (todos[i].id === id) {
                    for (var key in todo) {
                        todos[i][key] = todo[key];
                    }
                    break;
                }
            }
            localStorage[this.name] = JSON.stringify(data);
            callback();
        } else {
            todo.id = Date.now();
            todos.push(todo);
            localStorage[this.name] = JSON.stringify(data);
            callback();
        }
    };
    Store.prototype.find = function (query, callback) {
        if (!callback) return;
        var todos = JSON.parse(localStorage[this.name]).todos;
        var filter = todos.filter(function (todo) {
            for (var q in query) {
                if (query[q] !== todo[q]) return false;
            }
            return true;
        });
        callback(filter);
    };
    Store.prototype.all = function (callback) {
        if (!callback) return;
        var todos = JSON.parse(localStorage[this.name]).todos;
        callback(todos);
    };
    Store.prototype.remove = function (id, callback) {
        var data = JSON.parse(localStorage[this.name]);
        var todos = data.todos;
        for (var i = 0, length = todos.length; i < length; i++) {
            if (todos[i].id === id) {
                todos.splice(i, 1);
                break;
            }
        }
        localStorage[this.name] = JSON.stringify(data);
        callback();
    };
    return Store;
}();
exports["default"] = Store;
},{}],"js\\model.ts":[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
var Model = /** @class */function () {
    function Model(store) {
        this.store = store;
    }
    Model.prototype.create = function (title, callback) {
        var newTodo = {
            title: title,
            completed: false
        };
        this.store.save(newTodo, callback);
    };
    Model.prototype.read = function (query, callback) {
        var queryType = typeof query === "undefined" ? "undefined" : _typeof(query);
        switch (queryType) {
            case "function":
                callback = query;
                this.store.all(callback);
                break;
            case "string":
            case "number":
                query = parseInt(query, 10);
                this.store.find({ id: query }, callback);
                break;
            default:
                this.store.find(query, callback);
        }
    };
    Model.prototype.update = function (todoToggled, callback) {
        this.store.save(todoToggled, callback);
    };
    Model.prototype["delete"] = function (id, callback) {
        this.store.remove(id, callback);
    };
    Model.prototype.getCount = function (callback) {
        var todosCount = {
            active: 0,
            completed: 0,
            total: 0
        };
        this.store.all(function (data) {
            data.forEach(function (todo) {
                todo.completed ? todosCount.completed++ : todosCount.active++;
                todosCount.total++;
            });
        });
        callback(todosCount);
    };
    return Model;
}();
exports["default"] = Model;
},{}],"js\\template.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var Template = /** @class */function () {
    function Template() {}
    Template.prototype.show = function (todos) {
        return todos.map(function (todo) {
            var id = todo.id,
                title = todo.title,
                completed = todo.completed;
            return "\n          <li data-id=\"" + id + "\" " + (completed ? "class=\"completed\"" : "") + ">\n            <div class=\"view\">\n              <input \n                class=\"toggle\" \n                type=\"checkbox\" \n                autocompleted=\"off\" \n                " + (completed ? "checked" : "") + "\n              >\n              <label>" + title + "</label>\n              <button class=\"destroy\"></button>\n            </div>\n          </li>\n        ";
        }).join("");
    };
    Template.prototype.todoCounter = function (active) {
        var plural = active < 2 ? "" : "s";
        return "\n      <strong>" + active + "</strong> item" + plural + " left\n    ";
    };
    return Template;
}();
exports["default"] = Template;
},{}],"js\\helpers.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.$ = function (selector, scope) {
    if (scope === void 0) {
        scope = document;
    }
    return scope.querySelector(selector);
};
exports.$parent = function (element, tagName) {
    if (!element.parentNode) return;
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
        return element.parentNode;
    }
    return exports.$parent(element.parentNode, tagName);
};
exports.$on = function (element, event, fn, options) {
    if (options === void 0) {
        options = {};
    }
    var delegatorFn = function delegatorFn(e) {
        return e.target.matches(options.target) && fn.call(e.target, e);
    };
    element.addEventListener(event, options.target ? delegatorFn : fn, options.capture || false);
    if (options.target) return delegatorFn;
};
},{}],"js\\constants.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
// 按键映射
exports.ENTER_KEY = 13;
exports.ESCAPE_KEY = 27;
// 视图渲染
var Render;
(function (Render) {
    Render[Render["ShowEntries"] = 0] = "ShowEntries";
    Render[Render["RemoveTodo"] = 1] = "RemoveTodo";
    Render[Render["EditTodos"] = 2] = "EditTodos";
    Render[Render["EditTodosDone"] = 3] = "EditTodosDone";
    Render[Render["UpdateElementCount"] = 4] = "UpdateElementCount";
    Render[Render["ClearCompletedButton"] = 5] = "ClearCompletedButton";
    Render[Render["CountentBlockVisibility"] = 6] = "CountentBlockVisibility";
    Render[Render["ToggleAll"] = 7] = "ToggleAll";
    Render[Render["CompleteTodo"] = 8] = "CompleteTodo";
    Render[Render["ClearNewTodo"] = 9] = "ClearNewTodo";
    Render[Render["SetFilter"] = 10] = "SetFilter";
})(Render = exports.Render || (exports.Render = {}));
},{}],"js\\view.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var helpers_1 = require("./helpers");
var constants_1 = require("./constants");
var View = /** @class */function () {
    function View(template) {
        this.template = template;
        this.$new = helpers_1.$(".new-todo");
        this.$list = helpers_1.$(".todo-list");
        this.$counter = helpers_1.$(".todo-count");
        this.$clearCompleted = helpers_1.$(".clear-completed");
        this.$main = helpers_1.$(".main");
        this.$footer = helpers_1.$(".footer");
        this.$toggleAll = helpers_1.$(".toggle-all");
    }
    View.prototype.getItemId = function (element) {
        var li = helpers_1.$parent(element, "li");
        return parseInt(li.dataset.id, 10);
    };
    // 监听事件：新增条目
    View.prototype.onAddTodo = function (handler) {
        var _this = this;
        helpers_1.$on(this.$new, "change", function () {
            handler(_this.$new.value);
        });
    };
    // 监听事件：移除条目
    View.prototype.onRemoveTodo = function (handler) {
        var _this = this;
        helpers_1.$on(this.$list, "click", function (event) {
            var id = _this.getItemId(event.target);
            handler(id);
        }, { target: ".destroy" });
    };
    // 监听事件：切换条目完成与否
    View.prototype.onToggleTodo = function (handler) {
        var _this = this;
        helpers_1.$on(this.$list, "change", function (event) {
            var id = _this.getItemId(event.target);
            var completed = event.target.checked;
            handler({ id: id, completed: completed });
        }, { target: ".toggle" });
    };
    // 监听事件：切换全部条目的完成与否
    View.prototype.onToggleAllTodo = function (handler) {
        helpers_1.$on(this.$toggleAll, "change", function (event) {
            handler(event.target.checked);
        });
    };
    // 监听事件：编辑条目
    View.prototype.onEditTodo = function (handler) {
        var _this = this;
        helpers_1.$on(this.$list, "dblclick", function (event) {
            var id = _this.getItemId(event.target);
            handler(id);
        }, { target: "li label" });
    };
    // 监听事件：完成条目编辑
    View.prototype.onEditTodoDone = function (handler) {
        var _this = this;
        helpers_1.$on(this.$list, "blur", function (event) {
            if (!event.target.dataset.iscanceled) {
                var id = _this.getItemId(event.target);
                var title = event.target.value;
                handler({ id: id, title: title });
            }
        }, { target: "li .edit", capture: true });
        helpers_1.$on(this.$list, "keypress", function (event) {
            event.keyCode === constants_1.ENTER_KEY && event.target.blur();
        }, { target: "li .edit" });
    };
    // 监听事件：放弃条目编辑
    View.prototype.onEditTodoCancel = function (handler) {
        var _this = this;
        helpers_1.$on(this.$list, "keyup", function (event) {
            if (event.keyCode === constants_1.ESCAPE_KEY) {
                event.target.dataset.iscanceled = true;
                event.target.blur();
                var id = _this.getItemId(event.target);
                handler(id);
            }
        }, { target: "li .edit" });
    };
    // 监听事件：删除所有完成条目
    View.prototype.onRemoveCompleted = function (handler) {
        helpers_1.$on(this.$clearCompleted, "click", function () {
            handler();
        });
    };
    // 监听事件：页面载入完成
    View.prototype.onLoad = function (handler) {
        helpers_1.$on(window, "load", function () {
            handler(document.location.hash);
        });
    };
    // 监听事件：路由改变
    View.prototype.onHashChange = function (handler) {
        helpers_1.$on(window, "hashchange", function () {
            handler(document.location.hash);
        });
    };
    // 渲染页面
    View.prototype.render = function (command, parameter) {
        this[command](parameter);
    };
    // 渲染：清理输入框
    View.prototype[constants_1.Render.ClearNewTodo] = function () {
        this.$new.value = "";
    };
    // 渲染：列表视图可见性
    View.prototype[constants_1.Render.CountentBlockVisibility] = function (visible) {
        this.$main.hidden = this.$footer.hidden = !visible;
    };
    // 渲染：“清除所有完成项”按钮可见性
    View.prototype[constants_1.Render.ClearCompletedButton] = function (visible) {
        this.$clearCompleted.hidden = !visible;
    };
    // 渲染：同步“选择全部”表单项
    View.prototype[constants_1.Render.ToggleAll] = function (allChecked) {
        this.$toggleAll.checked = allChecked;
    };
    // 渲染：列表
    View.prototype[constants_1.Render.ShowEntries] = function (todos) {
        this.$list.innerHTML = this.template.show(todos);
    };
    // 渲染：底部过滤器
    View.prototype[constants_1.Render.SetFilter] = function (currentPage) {
        helpers_1.$(".filters .selected").classList.remove("selected");
        helpers_1.$(".filters [href=\"#/" + currentPage + "\"]").classList.add("selected");
    };
    // 渲染：底部计数
    View.prototype[constants_1.Render.UpdateElementCount] = function (active) {
        this.$counter.innerHTML = this.template.todoCounter(active);
    };
    // 渲染：移除一条
    View.prototype[constants_1.Render.RemoveTodo] = function (id) {
        var el = helpers_1.$("[data-id=\"" + id + "\"]");
        el && this.$list.removeChild(el);
    };
    // 渲染：切换完成状态
    View.prototype[constants_1.Render.CompleteTodo] = function (toggleTodo) {
        var id = toggleTodo.id,
            completed = toggleTodo.completed;
        var todo = helpers_1.$("[data-id=\"" + id + "\"]");
        /**
         * 当在 'Active' 和 'Completed' 路由时，点击 'toggleAll'.
         * 因强制不刷新 filter，DOM还未就绪，所有这里直接返回，等待最后一并刷新。
         */
        if (!todo) return;
        todo.classList.toggle("completed", completed);
        helpers_1.$("input", todo).checked = completed;
    };
    // 渲染：编辑条目
    View.prototype[constants_1.Render.EditTodos] = function (todo) {
        var id = todo.id,
            title = todo.title;
        var editing = helpers_1.$("[data-id=\"" + id + "\"]");
        editing.classList.add("editing");
        var input = document.createElement("input");
        input.className = "edit";
        editing.appendChild(input);
        input.focus();
        input.value = title;
    };
    // 渲染：完成编辑条目
    View.prototype[constants_1.Render.EditTodosDone] = function (todo) {
        var id = todo.id,
            title = todo.title;
        var editing = helpers_1.$("[data-id=\"" + id + "\"]");
        var input = helpers_1.$(".edit", editing);
        editing.removeChild(input);
        editing.classList.remove("editing");
        helpers_1.$("label", editing).textContent = title;
    };
    return View;
}();
exports["default"] = View;
},{"./helpers":"js\\helpers.ts","./constants":"js\\constants.ts"}],"js\\controller.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var constants_1 = require("./constants");
var Controller = /** @class */function () {
    function Controller(model, view) {
        this.model = model;
        this.view = view;
        this.activeRoute = "";
        this.lastActiveRoute = "";
        this.on();
    }
    // 监听 DOM 事件
    Controller.prototype.on = function () {
        var _this = this;
        this.view.onAddTodo(function (title) {
            _this.addTodo(title);
        });
        this.view.onRemoveTodo(function (id) {
            _this.removeTodo(id);
        });
        this.view.onToggleTodo(function (todoToggled) {
            _this.toggleTodo(todoToggled);
        });
        this.view.onToggleAllTodo(function (status) {
            _this.toggleAllTodo(status);
        });
        this.view.onEditTodo(function (id) {
            _this.editTodo(id);
        });
        this.view.onEditTodoDone(function (todo) {
            _this.editTodoDone(todo);
        });
        this.view.onEditTodoCancel(function (id) {
            _this.editTodoCancel(id);
        });
        this.view.onRemoveCompleted(function () {
            _this.removeCompleted();
        });
        this.view.onHashChange(function (hash) {
            _this.setView(hash);
        });
        this.view.onLoad(function (hash) {
            _this.setView(hash);
        });
    };
    Controller.prototype.addTodo = function (title) {
        var _this = this;
        if (title.trim() === "") return;
        this.model.create(title, function () {
            _this.view.render(constants_1.Render.ClearNewTodo);
            _this.filter(true);
        });
    };
    Controller.prototype.removeTodo = function (id) {
        var _this = this;
        this.model["delete"](id, function () {
            _this.view.render(constants_1.Render.RemoveTodo, id);
        });
        this.filter();
    };
    Controller.prototype.toggleTodo = function (todoToggled, silent) {
        var _this = this;
        if (silent === void 0) {
            silent = false;
        }
        this.model.update(todoToggled, function () {
            _this.view.render(constants_1.Render.CompleteTodo, todoToggled);
        });
        !silent && this.filter();
    };
    Controller.prototype.toggleAllTodo = function (completed) {
        var _this = this;
        this.model.read({ completed: !completed }, function (todos) {
            todos.forEach(function (todo) {
                var id = todo.id,
                    completed = todo.completed;
                _this.toggleTodo({ id: id, completed: !completed }, true);
            });
        });
        this.filter();
    };
    Controller.prototype.editTodo = function (id) {
        var _this = this;
        this.model.read(id, function (todo) {
            var title = todo[0].title;
            _this.view.render(constants_1.Render.EditTodos, { id: id, title: title });
        });
    };
    Controller.prototype.editTodoDone = function (todo) {
        var _this = this;
        var id = todo.id,
            title = todo.title;
        title = title.trim();
        if (title.length !== 0) {
            this.model.update({ id: id, title: title }, function () {
                _this.view.render(constants_1.Render.EditTodosDone, { id: id, title: title });
            });
        } else {}
    };
    Controller.prototype.editTodoCancel = function (id) {
        var _this = this;
        this.model.read(id, function (todo) {
            var title = todo[0].title;
            _this.view.render(constants_1.Render.EditTodosDone, { id: id, title: title });
        });
    };
    Controller.prototype.removeCompleted = function () {
        var _this = this;
        this.model.read({ completed: true }, function (todos) {
            todos.forEach(function (todo) {
                var id = todo.id;
                _this.removeTodo(id);
            });
        });
        this.filter();
    };
    Controller.prototype.setView = function (locationHash) {
        var route = locationHash.split("/")[1];
        var page = route || "";
        this.updateFilterState(page);
    };
    Controller.prototype.updateFilterState = function (currentPage) {
        this.activeRoute = currentPage;
        this.activeRoute = this.activeRoute || "All";
        this.filter();
        this.view.render(constants_1.Render.SetFilter, currentPage);
    };
    Controller.prototype.filter = function (force) {
        if (force === void 0) {
            force = false;
        }
        var activeRoute = this.activeRoute.charAt(0).toUpperCase() + this.activeRoute.substr(1);
        this.updateCount();
        if (force || this.lastActiveRoute !== "All" || this.lastActiveRoute !== activeRoute) {
            this["show" + activeRoute]();
        }
        this.lastActiveRoute = activeRoute;
    };
    Controller.prototype.updateCount = function () {
        var _this = this;
        this.model.getCount(function (todosCount) {
            var active = todosCount.active,
                completed = todosCount.completed,
                total = todosCount.total;
            _this.view.render(constants_1.Render.UpdateElementCount, active);
            _this.view.render(constants_1.Render.ClearCompletedButton, completed > 0);
            _this.view.render(constants_1.Render.ToggleAll, completed === total);
            _this.view.render(constants_1.Render.CountentBlockVisibility, total > 0);
        });
    };
    Controller.prototype.showAll = function () {
        var _this = this;
        this.model.read(function (data) {
            _this.view.render(constants_1.Render.ShowEntries, data);
        });
    };
    Controller.prototype.showActive = function () {
        var _this = this;
        this.model.read({ completed: false }, function (data) {
            _this.view.render(constants_1.Render.ShowEntries, data);
        });
    };
    Controller.prototype.showCompleted = function () {
        var _this = this;
        this.model.read({ completed: true }, function (data) {
            _this.view.render(constants_1.Render.ShowEntries, data);
        });
    };
    return Controller;
}();
exports["default"] = Controller;
},{"./constants":"js\\constants.ts"}],"js\\app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var store_1 = __importDefault(require("./store"));
var model_1 = __importDefault(require("./model"));
var template_1 = __importDefault(require("./template"));
var view_1 = __importDefault(require("./view"));
var controller_1 = __importDefault(require("./controller"));
var TodoApp = /** @class */function () {
    function TodoApp(name) {
        this.name = name;
        this.store = new store_1["default"](this.name);
        this.model = new model_1["default"](this.store);
        this.template = new template_1["default"]();
        this.view = new view_1["default"](this.template);
        this.controller = new controller_1["default"](this.model, this.view);
    }
    return TodoApp;
}();
exports["default"] = TodoApp;
},{"./store":"js\\store.ts","./model":"js\\model.ts","./template":"js\\template.ts","./view":"js\\view.ts","./controller":"js\\controller.ts"}],"js\\index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
require("todomvc-app-css");
var app_1 = __importDefault(require("./app"));
var todo = new app_1["default"]("todomvc-typescript");
},{"todomvc-app-css":"..\\node_modules\\todomvc-app-css\\index.css","./app":"js\\app.ts"}],"..\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51237' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","js\\index.ts"], null)
//# sourceMappingURL=/js.0608a514.map