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

Formatter.prototype.iprint = function(messages) {
  return this.print(messages, 8);
};

Formatter.prototype.ljust = function(str, width) {
  str += '';
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
};

/**
 * Primary exports.
 */

module.exports = Formatter;
