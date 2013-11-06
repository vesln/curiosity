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
 * @param {String|Array} msg
 * @param {Number} padding
 * @api private
 */

Formatter.prototype.print = function(messages, padding) {
  padding = padding || 0;

  if (Array.isArray(messages)) return messages.forEach(function(msg) {
    return this.print(msg, padding);
  }, this);

  messages = messages || '';
  this.out.write(Array(padding).join(' ') + messages + '\n');
};

/**
 * Print with left padding.
 *
 * @param {Array} messages
 * @api private
 */

Formatter.prototype.iprint = function(messages) {
  this.print(messages, 8);
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
