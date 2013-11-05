function Stats() {
  this.counters = {};
  this._total = {};
  this._min = {};
  this._max = {};
  this.keys = {};
}

Stats.prototype.inc = function(type, len) {
  len = len || 1;
  this.counters[type] = this.counters[type] || 0;
  this.counters[type] += len;
  this.key(type, 'inc');
};

Stats.prototype.counter = function(type) {
  return this.counters[type] || 0;
};

Stats.prototype.count = function(type, num) {
  this._total[type] = this._total[type] || 0;
  this._min[type] = this._min[type] || num;
  this._max[type] = this._max[type] || num;

  if (this._min[type] > num) this._min[type] = num;
  if (this._max[type] < num) this._max[type] = num;

  this._total[type] += num;
  this.inc(type);
  this.key(type, 'full');
};

Stats.prototype.max = function(type) {
  return this._max[type] || 0;
};

Stats.prototype.min = function(type) {
  return this._min[type] || 0;
};

Stats.prototype.avg = function(type) {
  return (this.total(type) / this.counter(type)).toFixed(2);
};

Stats.prototype.total = function(type) {
  return this._total[type] || 0;
};

Stats.prototype.key = function(key, type) {
  if (!this.keys[key]) {
    return this.keys[key] = type;
  }

  if (this.keys[key] === 'inc' && type === 'full') {
    this.keys[key] = 'full';
  }
};

Stats.prototype.result = function() {
  var ret = {};
  var type = null;

  Object.keys(this.keys).forEach(function(key) {
    type = this.keys[key]
    ret[key] = { total: this.counter(key) };

    if (type === 'full') {
      ret[key].min = this.min(key);
      ret[key].max = this.max(key);
      ret[key].avg = this.avg(key);
    }
  }, this);

  return ret;
};

module.exports = Stats;
