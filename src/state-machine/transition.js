module.exports = {
  schema: {
    on: {default: ''},
    where: {default: ''},
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

    if (data.on !== prevData.on) {
      if (prevData.on) el.removeEventListener(prevData.on, this.fire);
      if (data.on) el.addEventListener(data.on, this.fire);
    }
  },
  fire: function (e) {
    var stateMachine = this.system.getStateMachine(this);
    var data = this.data;
    if (data.where) {
      throw new Error('[transition] Conditional transitions not implemented.');
    }
    stateMachine.setState(data.state);
  }
};
