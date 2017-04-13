module.exports = {
  schema: {
    set: {default: ''},
    to: {default: ''}
  },
  init: function () {
    this.system = this.el.sceneEl.systems['state-machine'];
    this.eventType = 'stateadded';
    this.fire = this.fire.bind(this);
    this.onStateChanged = this.onStateChanged.bind(this);
  },
  play: function () {
    var stateMachine = this.system.getStateMachine(this);
    stateMachine.el.addEventListener(this.eventType, this.onStateChanged);
  },
  pause: function () {
    var stateMachine = this.system.getStateMachine(this);
    stateMachine.el.removeEventListener(this.eventType, this.onStateChanged);
  },
  onStateChanged: function (e) {
    if (e.detail.state === this.el.getAttribute('name')) {
      this.fire(e);
    }
  },
  fire: function (e) {
    var stateMachine = this.system.getStateMachine(this);
    var data = this.data;
    var component;
    var property = data.set;
    var value = data.to;
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
