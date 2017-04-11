module.exports = {
  'state-machine': require('./state-machine'),
  'a-state':         require('./a-state'),
  'start-set':       require('./start-set'),
  'end-set':         require('./end-set'),
  'transition':      require('./transition'),

  registerAll: function (AFRAME) {
    if (this._registered) return;

    AFRAME = AFRAME || window.AFRAME;

    this['state-machine'].registerAll(AFRAME);
    this['a-state'].registerAll(AFRAME);

    AFRAME.registerComponent('start-set', this['start-set']);
    AFRAME.registerComponent('end-set', this['end-set']);
    AFRAME.registerComponent('transition', this.transition);

    this._registered = true;
  }
};
