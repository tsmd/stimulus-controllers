/**
 *
 * @param {EventTarget} el
 * @param {string} type
 * @param {EventListenerOrEventListenerObject | null} callback
 * @param {AddEventListenerOptions | boolean} [options]
 * @returns {{remove: Function}}
 */
export function listen(el, type, callback, options) {
  el.addEventListener(type, callback, options);
  return { remove: () => el.removeEventListener(type, callback, options) };
}

/**
 * @param {string} [prefix]
 * @returns {string}
 */
export function randomId(prefix = "id-") {
  const id = Math.random().toString(36).slice(2);
  return `${prefix}${id}`;
}

/**
 * @param {HTMLElement | DocumentFragment} [wrapper]
 * @returns {HTMLElement[]}
 */
export function tabbable(wrapper = document.body) {
  const tabbableSelectors = [
    "a[href]",
    "area[href]",
    "audio[controls]",
    "button",
    "iframe",
    'input:not([type="hidden"])',
    "select",
    "textarea",
    "video[controls]",
    "[tabindex]",
  ];
  return [...wrapper.querySelectorAll(tabbableSelectors.join(","))].filter(
    (el) => !el.hidden && !el.disabled && el.tabIndex !== -1
  );
}
