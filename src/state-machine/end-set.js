var StartSet = require('./start-set');

module.exports = AFRAME.utils.extend({}, StartSet, {
  init: function () {
    StartSet.init.call(this);
    this.mode = 'stateend';
  }
});
