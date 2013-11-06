/**
 * Base formatter.
 *
 * @param {String} data
 * @param {WritableStream} out
 * @constructor
 */

function Formatter(data, out) {
  this.data = data;
  this.out = out;
}

/**
 * Print given `msg`.
 *
 * @param {String} msg
 * @param {Number} padding
 * @api private
 */

Formatter.prototype.print = function(msg, padding) {
  padding = padding || 0;
  msg = msg || '';
  this.out.write(Array(padding).join(' ') + msg + '\n');
};

/**
 * Print with left padding.
 *
 * @param {String} msg
 * @api private
 */

Formatter.prototype.iprint = function(msg) {
  this.print(msg, 8);
};

/**
 * If `width` is greater than the length of `str`, return a new string of length `width`
 * with `str` left justified
 *
 * @param {String} str
 * @param {Number} width
 * @returns {String}
 * @api private
 */

Formatter.prototype.ljust = function(str, width) {
  str += '';
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
};

/**
 * Humanize the `key`.
 *
 * AssignmentExpression -> Assignment Expressions
 *
 * @returns {String}
 * @api private
 */

Formatter.prototype.name = function(key) {
  return key.split(/(?=[A-Z])/).join(' ') + 's';
};

/**
 * Primary exports.
 */

module.exports = Formatter;
