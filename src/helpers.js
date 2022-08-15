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
