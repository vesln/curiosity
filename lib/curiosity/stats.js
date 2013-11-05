/**
 * Stats.
 *
 * @constructor
 */

function Stats(file) {
  this.file = file;
  this.counters = {};
  this.keys = [];
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
  this.key(type);
};

/**
 * Return the result of everything stored.
 *
 * @returns {Object}
 * @api public
 */

Stats.prototype.result = function() {
  var ret = {};

  this.keys.forEach(function(key) {
    ret[key] = { count: this.counter(key) };
  }, this);

  return ret;
};

/**
 * Register a new key.
 *
 * @param {String} key
 * @api private
 */

Stats.prototype.key = function(key, type) {
  if (~this.keys.indexOf(key)) return;
  this.keys.push(key);
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
