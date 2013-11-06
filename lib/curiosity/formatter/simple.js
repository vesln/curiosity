/**
 * Core dependencies.
 */

var inherits = require('util').inherits;

/**
 * Internal dependencies.
 */

var Formattter = require('../formatter');
var countable = require('../countable');

/**
 * Simple formatter.
 *
 * @constructor
 */

function Simple() {
  Formattter.apply(this, arguments);
}

/**
 * Inherit from `Formattter`.
 */

inherits(Simple, Formattter);

/**
 * Print the result.
 *
 * @api public
 */

Simple.prototype.run = function() {
  var metrics = this.data.total.result;
  var keys = Object.keys(metrics);
  var names = ['Metric', '------'];
  var count = ['Total', '-----'];
  var avg = ['Average/file', '------------'];
  var lens = {};
  var group = undefined;
  var key = null;

  keys.forEach(function(key) {
    names.push(this.name(key));
    count.push(metrics[key].count);
    avg.push(metrics[key].average);
  }, this);

  lens.count = longest(count);
  lens.names = longest(names);
  lens.avg = longest(avg);

  this.print();

  for (var i = 0, len = count.length; i < len; i++) {
    key = keys[i - 2];

    if (typeof group !== 'undefined' && group != countable[key]) {
      this.print();
    }
    group = countable[key];

    this.iprint([
      this.ljust(names[i], lens.names),
      this.ljust(count[i], lens.count),
      this.ljust(avg[i], lens.avg)
    ].join('   '));
  }

  this.iprint('----------------------');
  this.iprint('Files: ' + this.data.total.files);
  this.print();
};

/**
 * Return the length of the longest string in
 * array.
 *
 * @param {Array} arr
 * @returns {Number}
 * @api private
 */

function longest(arr) {
  return arr.reduce(function(max, i) {
    return Math.max(max, ('' + i).length);
  }, 0);
}

/**
 * Primary export.
 */

module.exports = Simple;
