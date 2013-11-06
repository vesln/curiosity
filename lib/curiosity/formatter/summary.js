/**
 * Core dependencies.
 */

var inherits = require('util').inherits;

/**
 * Internal dependencies.
 */

var Formattter = require('../formatter');

/**
 * JSON formatter.
 *
 * @constructor
 */

function Summary() {
  Formattter.apply(this, arguments);
}

/**
 * Inherit from `Formattter`.
 */

inherits(Summary, Formattter);

/**
 * Print the result.
 *
 * @api public
 */

Summary.prototype.run = function() {
  var files = this.data.files;
  var longest = 4;
  var out = [];

  files.forEach(function(file, i) {
    var arr = [];
    arr[0] = file.filename;
    longest = Math.max(longest, file.filename.length);
    arr[1] = 0;
    Object.keys(file.result).forEach(function(key) {
      arr[1] += file.result[key].count;
    });
    out.push(arr);
  }, this);

  this.print();

  this.iprint(this.ljust('File', longest) + '  Sum');

  out.sort(function(a, b) {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  }).forEach(function(line) {
    this.iprint(this.ljust(line[0], longest) + '  ' + line[1]);
  }, this);

  this.print();
};

/**
 * Primary exports.
 */

module.exports = Summary;
