module.exports = {
  schema: {
    filter: {default: ''},
    distance: {default: 0, min: 0},
    event: {default: ''}
  },
  init: function () {
    this.nearSet = new Set();
  },
  tick: function () {
    var el = this.el;
    var data = this.data;
    var nearSet = this.nearSet;
    var els = [].slice.call(el.sceneEl.querySelectorAll(data.filter));

    var position = el.object3D.getWorldPosition();
    els.forEach(function(otherEl) {
      var otherPosition = otherEl.object3D.getWorldPosition();
      var distance = position.distanceTo(otherPosition);
      var isNear = distance <= data.distance;
      if (isNear && !nearSet.has(otherEl)) {
        nearSet.add(otherEl);
        el.emit(data.event + 'start', {el: otherEl, distance: distance});
        otherEl.emit(data.event + 'start', {el: el, distance: distance});
      } else if (!isNear && nearSet.has(otherEl)) {
        nearSet.delete(otherEl);
        el.emit(data.event + 'end', {el: otherEl, distance: distance});
        otherEl.emit(data.event + 'end', {el: el, distance: distance});
      }
    });
  }
};
