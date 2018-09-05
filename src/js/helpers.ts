export const $ = <T>(selector, scope: HTMLElement | Document = document): T =>
  scope.querySelector(selector);

export const $parent = (element, tagName) => {
  if (!element.parentNode) return;

  if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
    return element.parentNode;
  }

  return $parent(element.parentNode, tagName);
};

export const $on = (
  element,
  event,
  fn,
  options: { target?: string; capture?: boolean } = {}
) => {
  const delegatorFn = e =>
    e.target.matches(options.target) && fn.call(e.target, e);

  element.addEventListener(
    event,
    options.target ? delegatorFn : fn,
    options.capture || false
  );

  if (options.target) return delegatorFn;
};
