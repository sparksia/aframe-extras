var EventFilter = require('./EventFilter');

module.exports = {
  schema: {
    on: {default: ''},
    state: {default: ''}
  },
  init: function () {
    this.system = this.el.sceneEl.systems['state-machine'];
    this.fire = this.fire.bind(this);
  },
  update: function (prevData) {
    var machine = this.system.getStateMachine(this);
    var el = machine.el;
    var data = this.data;

    var filter = EventFilter.parse(data.on);
    var prevFilter = EventFilter.parse(prevData.on);

    if (filter !== prevFilter) {
      if (prevFilter) prevFilter.unlisten(el, this.fire);
      if (filter) filter.listen(el, this.fire);
    }
  },
  remove: function () {
    var filter = EventFilter.parse(this.data.on);
    if (filter) filter.unlisten(this.el, this.fire);
  },
  fire: function () {
    var stateMachine = this.system.getStateMachine(this);
    var data = this.data;
    stateMachine.setState(data.state);
  }
};
