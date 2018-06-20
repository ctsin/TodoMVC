(window => {
  "use strict";

  window.qs = (selector, scope) => {
    return (scope || document).querySelector(selector);
  };

  window.qsa = (selector, scope) => {
    return (scope || document).querySelectorAll(selector);
  };

  window.$on = (target, type, callback, useCapture = false) => {
    target.addEventListener(type, callback, !!useCapture);
  };

  window.$parent = (el, tagName) => {
    if (!el.parentNode) {
      return;
    }

    if (el.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return el.parentNode;
    }

    return window.$parent(el.parentNode, tagName);
  };

  window.$delegate = (target, selector, type, handler) => {
    function dispatchEvent(event) {
      var targetElement = event.target;
      var potentialElements = window.qsa(selector, target);
      var hasMatch =
        Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

      if (hasMatch) {
        handler.call(targetElement, event);
      }
    }

    var useCapture = type === "blur" || type === "focus";

    window.$on(target, type, dispatchEvent, useCapture);
  };

  NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
