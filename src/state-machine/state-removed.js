var StateAdded = require('./state-added');

module.exports = AFRAME.utils.extend({}, StateAdded, {
  init: function () {
    StateAdded.init.call(this);
    this.eventType = 'stateremoved';
  }
});
