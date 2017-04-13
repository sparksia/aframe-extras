module.exports = {
  'state-machine':      require('./state-machine'),
  'a-state':            require('./a-state'),
  'filtered-event-set': require('./filtered-event-set'),
  'state-added':        require('./state-added'),
  'state-removed':      require('./state-removed'),
  'transition':         require('./transition'),

  registerAll: function (AFRAME) {
    if (this._registered) return;

    AFRAME = AFRAME || window.AFRAME;

    this['state-machine'].registerAll(AFRAME);
    this['a-state'].registerAll(AFRAME);

    AFRAME.registerComponent('filtered-event-set', this['filtered-event-set']);
    AFRAME.registerComponent('state-added', this['state-added']);
    AFRAME.registerComponent('state-removed', this['state-removed']);
    AFRAME.registerComponent('transition', this.transition);

    this._registered = true;
  }
};
