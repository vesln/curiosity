/**
 * Stats.
 *
 * @constructor
 */

function Stats() {
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
  return this.keys.map(function(key) {
    return { key: key, total: this.counter(key) };
  }, this);
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
