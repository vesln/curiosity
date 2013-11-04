function Stats() {
  this.counters = {};
  this._total = {};
  this._min = {};
  this._max = {};
}

Stats.prototype.inc = function(type) {
  this.counters[type] = this.counters[type] || 0;
  this.counters[type]++;
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
};

Stats.prototype.max = function(type) {
  return this._max[type] || 0;
};

Stats.prototype.min = function(type) {
  return this._min[type] || 0;
};

Stats.prototype.avg = function(type) {
  var total = this.counter(type);
  return this.total() / this.counter();
};

Stats.prototype.total = function(type) {
  return this._total[type] || 0;
};

module.exports = Stats;
