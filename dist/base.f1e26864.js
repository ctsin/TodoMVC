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
})({31:[function(require,module,exports) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  "use strict";

  /* jshint ignore:start */
  // Underscore's Template Module
  // Courtesy of underscorejs.org

  var _ = function (_) {
    _.defaults = function (object) {
      if (!object) {
        return object;
      }
      for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
        var iterable = arguments[argsIndex];
        if (iterable) {
          for (var key in iterable) {
            if (object[key] == null) {
              object[key] = iterable[key];
            }
          }
        }
      }
      return object;
    };

    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };

    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;

    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
      "'": "'",
      "\\": "\\",
      "\r": "r",
      "\n": "n",
      "\t": "t",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };

    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    _.template = function (text, data, settings) {
      var render;
      settings = _.defaults({}, settings, _.templateSettings);

      // Combine delimiters into one regular expression via alternation.
      var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g");

      // Compile the template source, escaping string literals appropriately.
      var index = 0;
      var source = "__p+='";
      text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escaper, function (match) {
          return "\\" + escapes[match];
        });

        if (escape) {
          source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        }
        if (interpolate) {
          source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        }
        if (evaluate) {
          source += "';\n" + evaluate + "\n__p+='";
        }
        index = offset + match.length;
        return match;
      });
      source += "';\n";

      // If a variable is not specified, place data values in local scope.
      if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";

      source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";

      try {
        render = new Function(settings.variable || "obj", "_", source);
      } catch (e) {
        e.source = source;
        throw e;
      }

      if (data) return render(data, _);
      var template = function template(data) {
        return render.call(this, data, _);
      };

      // Provide the compiled function source as a convenience for precompilation.
      template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";

      return template;
    };

    return _;
  }({});

  function redirect() {
    if (location.hostname === "tastejs.github.io") {
      location.href = location.href.replace("tastejs.github.io/todomvc", "todomvc.com");
    }
  }

  function findRoot() {
    var base = location.href.indexOf("examples/");
    return location.href.substr(0, base);
  }

  function getFile(file, callback) {
    if (!location.host) {
      return console.info("Miss the info bar? Run TodoMVC from a server to avoid a cross-origin error.");
    }

    var xhr = new XMLHttpRequest();

    xhr.open("GET", findRoot() + file, true);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200 && callback) {
        callback(xhr.responseText);
      }
    };
  }

  function Learn(learnJSON, config) {
    if (!(this instanceof Learn)) {
      return new Learn(learnJSON, config);
    }

    var template, framework;

    if ((typeof learnJSON === "undefined" ? "undefined" : _typeof(learnJSON)) !== "object") {
      try {
        learnJSON = JSON.parse(learnJSON);
      } catch (e) {
        return;
      }
    }

    if (config) {
      template = config.template;
      framework = config.framework;
    }

    if (!template && learnJSON.templates) {
      template = learnJSON.templates.todomvc;
    }

    if (!framework && document.querySelector("[data-framework]")) {
      framework = document.querySelector("[data-framework]").dataset.framework;
    }

    this.template = template;

    if (learnJSON.backend) {
      this.frameworkJSON = learnJSON.backend;
      this.frameworkJSON.issueLabel = framework;
      this.append({
        backend: true
      });
    } else if (learnJSON[framework]) {
      this.frameworkJSON = learnJSON[framework];
      this.frameworkJSON.issueLabel = framework;
      this.append();
    }

    this.fetchIssueCount();
  }

  Learn.prototype.append = function (opts) {
    var aside = document.createElement("aside");
    aside.innerHTML = _.template(this.template, this.frameworkJSON);
    aside.className = "learn";

    if (opts && opts.backend) {
      // Remove demo link
      var sourceLinks = aside.querySelector(".source-links");
      var heading = sourceLinks.firstElementChild;
      var sourceLink = sourceLinks.lastElementChild;
      // Correct link path
      var href = sourceLink.getAttribute("href");
      sourceLink.setAttribute("href", href.substr(href.lastIndexOf("http")));
      sourceLinks.innerHTML = heading.outerHTML + sourceLink.outerHTML;
    } else {
      // Localize demo links
      var demoLinks = aside.querySelectorAll(".demo-link");
      Array.prototype.forEach.call(demoLinks, function (demoLink) {
        if (demoLink.getAttribute("href").substr(0, 4) !== "http") {
          demoLink.setAttribute("href", findRoot() + demoLink.getAttribute("href"));
        }
      });
    }

    document.body.className = (document.body.className + " learn-bar").trim();
    document.body.insertAdjacentHTML("afterBegin", aside.outerHTML);
  };

  Learn.prototype.fetchIssueCount = function () {
    var issueLink = document.getElementById("issue-count-link");
    if (issueLink) {
      var url = issueLink.href.replace("https://github.com", "https://api.github.com/repos");
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = function (e) {
        var parsedResponse = JSON.parse(e.target.responseText);
        if (parsedResponse instanceof Array) {
          var count = parsedResponse.length;
          if (count !== 0) {
            issueLink.innerHTML = "This app has " + count + " open issues";
            document.getElementById("issue-count").style.display = "inline";
          }
        }
      };
      xhr.send();
    }
  };

  redirect();
  getFile("learn.json", Learn);
})();
},{}],47:[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63622' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
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
        parents.push(+k);
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
},{}]},{},[47,31], null)
//# sourceMappingURL=/base.f1e26864.map