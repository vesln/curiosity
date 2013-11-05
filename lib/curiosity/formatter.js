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

Formatter.prototype.print = function(msg) {
  this.out.write(msg + '\n');
};

/**
 * Primary exports.
 */

module.exports = Formatter;
