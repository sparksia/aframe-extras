var EventFilter = require('./EventFilter');

module.exports = {
  schema: {
    on: {default: ''},
    property: {default: ''},
    value: {default: ''}
  },
  init: function () {
    this.system = this.el.sceneEl.systems['state-machine'];
    this.fire = this.fire.bind(this);
  },
  update: function (prevData) {
    var machine = this.system.getStateMachine(this);
    var machineEl = machine.el;
    var data = this.data;

    var filter = EventFilter.parse(data.on);
    var prevFilter = EventFilter.parse(prevData.on);

    if (filter !== prevFilter) {
      if (prevFilter) prevFilter.unlisten(machineEl, this.fire);
      if (filter) filter.listen(machineEl, this.fire);
    }
  },
  remove: function () {
    var machine = this.system.getStateMachine(this);
    var machineEl = machine.el;
    var filter = EventFilter.parse(this.data.on);
    if (filter) filter.unlisten(machineEl, this.fire);
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
