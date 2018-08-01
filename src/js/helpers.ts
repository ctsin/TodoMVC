import { eventHandler } from "./interface";

export const $ = (selector, scope = document): Element =>
  scope.querySelector(selector);

export const $$ = (selector, scope = document): NodeList =>
  scope.querySelectorAll(selector);

export const $on: eventHandler = (target, type, handler, capture = false) => {
  target.addEventListener(type, handler, capture);
};

export const $delegate = (target, selector, type, handler) => {
  const dispatchEvent = event => {
    const potentailElements = $$(selector, target);
    const hasMatch = Array.from(potentailElements).indexOf(event.target) > -1;

    hasMatch && handler.call(event.target, event);
  };

  const capture = type === "blur" || type === "focus";

  $on(target, type, dispatchEvent, capture);
};

export const $parent = (element, tagName) => {
  if (!element.parentNode) return;

  if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
    return element.parentNode;
  }

  return $parent(element.parentNode, tagName);
};
