/**
 * Core dependencies.
 */

var fs = require('fs');

/**
 * External dependencies.
 */

var esprima = require('esprima');

/**
 * Group of files.
 *
 * @param {Array} files
 * @constructor
 */

function Group(files) {
  this.files = files;
}

/**
 * Parse and execute `fn` for every file.
 *
 * @param {Function} fn
 * @param {Object} context
 * @api public
 */

Group.prototype.each = function(fn, ctx) {
  this.files.forEach(function(file) {
    var data = fs.readFileSync(file, 'utf8');
    var ast = null;

    try {
      ast = esprima.parse(data, { tokens: true, comment: true });
    } catch (e) {}

    if (ast) fn.call(ctx, ast, file, data);
  });
};

/**
 * Primary export.
 */

module.exports = Group;
