/**
 * Counter types.
 */

var FULL = 1;
var INC = 2;

/**
 * Stats.
 *
 * @constructor
 */

function Stats() {
  this.counters = {};
  this._total = {};
  this._min = {};
  this._max = {};
  this.keys = {};
}

/**
 * Increment a counter.
 *
 * @param {String} type
 * @param {Number} len
 * @api public
 */

Stats.prototype.inc = function(type, len) {
  len = len || 1;
  this.counters[type] = this.counters[type] || 0;
  this.counters[type] += len;
  this.key(type, INC);
};

/**
 * Count min, max and total for `num`.
 *
 * @param {String} type
 * @param {Number} num
 * @api public
 */

Stats.prototype.count = function(type, num) {
  this._total[type] = this._total[type] || 0;
  this._min[type] = this._min[type] || num;
  this._max[type] = this._max[type] || num;

  if (this._min[type] > num) this._min[type] = num;
  if (this._max[type] < num) this._max[type] = num;

  this._total[type] += num;
  this.inc(type);
  this.key(type, FULL);
};

/**
 * Return the result of everything stored.
 *
 * @returns {Object}
 * @api public
 */

Stats.prototype.result = function() {
  var ret = {};
  var type = null;

  Object.keys(this.keys).forEach(function(key) {
    type = this.keys[key];
    ret[key] = { total: this.counter(key) };

    if (type === FULL) {
      ret[key].min = this.min(key);
      ret[key].max = this.max(key);
      ret[key].avg = this.avg(key);
    }
  }, this);

  return ret;
};

/**
 * Register a new key.
 *
 * @param {String} key
 * @param {Number} type [FULL or INC]
 * @api private
 */

Stats.prototype.key = function(key, type) {
  if (!this.keys[key]) {
    this.keys[key] = type;
    return;
  }

  if (this.keys[key] === INC && type === FULL) {
    this.keys[key] = FULL;
  }
};

/**
 * Return max for `type`.
 *
 * @param {String} type
 * @returns {Number}
 * @api private
 */

Stats.prototype.max = function(type) {
  return this._max[type] || 0;
};

/**
 * Return min for `type`.
 *
 * @param {String} type
 * @returns {Number}
 * @api private
 */

Stats.prototype.min = function(type) {
  return this._min[type] || 0;
};

/**
 * Return average for `type`.
 *
 * @param {String} type
 * @returns {Number}
 * @api private
 */

Stats.prototype.avg = function(type) {
  return (this.total(type) / this.counter(type)).toFixed(2);
};

/**
 * Return total for `type`.
 *
 * @param {String} type
 * @returns {Number}
 * @api private
 */

Stats.prototype.total = function(type) {
  return this._total[type] || 0;
};

/**
 * Return counter for `type`.
 *
 * @param {String} type
 * @returns {Number}
 * @api private
 */

Stats.prototype.counter = function(type) {
  return this.counters[type] || 0;
};

/**
 * Primary export.
 */

module.exports = Stats;
