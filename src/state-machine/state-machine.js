var Component = {
  schema: {
    initial: {default: ''}
  },
  init: function () {
    var data = this.data;
    this.state = data.initial;
  },
  remove: function () {
    this.el.removeState(this.state);
    this.state = '';
  },
  getState: function () {
    return this.state;
  },
  setState: function (state) {
    this.el.removeState(this.state);
    this.state = state;
    this.el.addState(this.state);
  },
  getStateEl: function () {
    if (!this.state) return null;
    return this.el.querySelector('a-state[name=' + this.state + ']');
  }
};

var System = {
  getStateMachine: function (component) {
    return component.el.parentElement.components['state-machine'];
  }
};

module.exports = {
  Component: Component,
  System: System,
  registerAll: (function() {
    var registered = false;
    return function (AFRAME) {
      if (registered) return;
      AFRAME.registerComponent('state-machine', Component);
      AFRAME.registerSystem('state-machine', System);
      registered = true;
    };
  }())
};
