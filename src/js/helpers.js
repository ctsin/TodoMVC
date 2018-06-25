/**
 * @param { string } selector Selector to query
 * @param { Element } [scope] Optional scope element for the selector
 */
export const qs = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

export const $on = (target, type, callback, capture) => {
  target.addEventListener(type, callback, !!capture);
};

export const $delegate = (target, selector, type, handler, capture) => {
  const dispatchEvent = event => {
    const targetElement = event.target;

    const potentialElements = target.querySelectorAll(selector);

    let i = potentialElements.length;

    while (i--) {
      if (potentialElements[i] === targetElement) {
        handler.call(targetElement, event);
        break;
      }
    }
  };

  $on(target, type, dispatchEvent, !!capture);
};

/**
 * @param {string} s String to escape
 *
 * @return {string} String with unsafe charactoers escaped with entity code
 */
export const escapeForHTML = s =>
  s.replace(/[&<]/g, c => (c === "&" ? "&amp;" : "&lt;"));
