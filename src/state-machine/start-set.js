module.exports = {
  schema: {
    property: {default: ''},
    value: {default: ''}
  },
  init: function () {
    this.system = this.el.sceneEl.systems['state-machine'];
    this.fire = this.fire.bind(this);
    this.mode = 'statestart';
  },
  play: function () {
    this.el.addEventListener(this.el.getAttribute('name') + this.mode, this.fire);
  },
  pause: function () {
    this.el.removeEventListener(this.el.getAttribute('name') + this.mode, this.fire);
  },
  fire: function (e) {
    var stateMachine = this.system.getStateMachine(this);
    var data = this.data;
    var component;
    var property = data.property;
    var value = data.value;
    if (value.indexOf('.') >= 0) {
      var eventValue = value.split('.');
      value = e.detail[eventValue[1]];
    }
    if (property.indexOf('.') >= 0) {
      var componentProperty = property.split('.');
      component = componentProperty[0];
      property = componentProperty[1];
      stateMachine.el.setAttribute(component, property, value);
    } else {
      stateMachine.el.setAttribute(property, value);
    }
  },
};
