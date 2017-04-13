var expr = require('expression-eval');

/**
 * Class for filtering events based on arbitrary expressions. For example, to
 * only return 'keypress' events that match a particular key, or 'statechange'
 * events that result in a particular state.
 *
 * Syntax: "<type> | <expression>"
 *
 * Example: "statechanged | detail.state === 'active'"
 *
 * Usage:
 *
 * ```
 * var listener = new FilteredEventListener('keypress | key === "A"');
 * var callback = (e) => { ... };
 * listener.listen(el, callback);
 * listener.unlisten(el, callback);
 * ```
 *
 * @param {string} input
 */
function FilteredEventListener (input) {
  this.input = input;

  var parts = input.match(/^([^|]+)(?: \|(.*))?$/);
  this.type = parts[1];
  this.expression = parts[2];

  if (!this.type) {
    throw new Error('[filtered-event] Could not parse: "' + input + '"');
  }

  if (this.expression) {
    this.evaluator = expr.compile(this.expression);
  } else {
    this.evaluator = function () { return true; };
  }

  this.nodeMap = new WeakMap();
  this.nodeCounter = 0;

  this.callbackMap = new WeakMap();
  this.callbackCounter = 0;

  this.listenerMap = new Map();
}

/**
 * Default (no-op) listener, which never invokes callbacks.
 * @type {FilteredEventListener}
 */
FilteredEventListener.DEFAULT_LISTENER = {
  listen: function () {},
  unlisten: function () {},
  input: ''
};

/**
 * Binds the instance's event and criteria to the given element and callback
 * function. Duplicate bindings will result in duplicate calls.
 *
 * @param {Element} el
 * @param {Function} callback
 */
FilteredEventListener.prototype.listen = function (el, callback) {
  var listeners = this.getListeners(el, callback);
  var listener = function (e) {
    if (this.evaluator(e)) callback(e);
  }.bind(this);
  el.addEventListener(this.type, listener);
  listeners.push(listener);
};

/**
 * Unbinds all listeners on the given element and callback.
 *
 * @param {Element} el
 * @param {Function} callback
 */
FilteredEventListener.prototype.unlisten = function (el, callback) {
  var listeners = this.getListeners(el, callback);
  listeners.forEach(function(listener) {
    el.removeEventListener(this.type, listener);
  }.bind(this));
  listeners.length = 0;
};

/**
 * Returns all current listeners for the given element and callback.
 *
 * @param {Element} el
 * @param {Function} callback
 * @return {Array<Function>}
 */
FilteredEventListener.prototype.getListeners = function (el, callback) {
  var nodeID = String(this.nodeMap.get(el) || ++this.nodeCounter);
  this.nodeMap.set(el, nodeID);

  var callbackID = String(this.callbackMap.get(callback) || ++this.callbackCounter);
  this.callbackMap.set(callback, callbackID);

  var listenerID = nodeID + ':' + callbackID;

  if (!this.listenerMap.has(listenerID)) {
    this.listenerMap.set(listenerID, []);
  }

  return this.listenerMap.get(listenerID);
};

module.exports = FilteredEventListener;
