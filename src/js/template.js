(window => {
  "use strict";

  var htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var escapeHtmlChar = chr => {
    return htmlEscapes[chr];
  };

  var reUnescapedHtml = /[&<>"'`]/g;
  var reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

  var escape = string => {
    return string && reHasUnescapedHtml.test(string)
      ? string.replace(reUnescapedHtml, escapeHtmlChar)
      : string;
  };

  /**
   * @constructor
   */
  class Template {
    constructor() {
      this.defaultTemplate = `
      <li data-id="{{id}}" class="{{completed}}">
        <div class="view">
          <input class="toggle" type="checkbox" {{checked}} />
          <label>{{title}}</label>
          <button class="destroy"></button>
        </div>
      </li>
      `;
    }
    show(data) {
      var view = "";
      for (var i = 0; i < data.length; i++) {
        var template = this.defaultTemplate;
        var completed = "";
        var checked = "";
        if (data[i].completed) {
          completed = "completed";
          checked = "checked";
        }
        template = template.replace("{{id}}", data[i].id);
        template = template.replace("{{title}}", escape(data[i].title));
        template = template.replace("{{completed}}", completed);
        template = template.replace("{{checked}}", checked);
        view += template;
      }
      return view;
    }
    itemCounter(activeTodos) {
      var plural = activeTodos === 1 ? "" : "s";
      return `<strong>${activeTodos}</strong> item${plural} left`;
    }
    clearCompletedButton(completedTodos) {
      return completedTodos > 0 ? `Clear Completed` : ``;
    }
  }

  window.app = window.app || {};
  window.app.Template = Template;
})(window);
