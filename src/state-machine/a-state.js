var Component = {};
var Primitive = {defaultComponents: {'state': {}}};

module.exports = {
  Component: Component,
  Primitive: Primitive,
  registerAll: (function() {
    var registered = false;
    return function (AFRAME) {
      if (registered) return;
      AFRAME.registerComponent('state', Component);
      AFRAME.registerPrimitive('a-state', Primitive);
      registered = true;
    };
  }())
};
