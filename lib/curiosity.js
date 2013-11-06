/**
 * Internal dependencies.
 */

var Runner = require('./curiosity/runner');
var bundler = require('./curiosity/bundler');
var Formatter = require('./curiosity/formatter');

/**
 * Analyze given files.
 *
 * @param {Array} files
 * @api public
 */

exports.analyzeFiles = function(files) {
  var runner = new Runner(files);
  var results = runner.run();
  return bundler.bundle(results);
};

/**
 * Export `Formatter`.
 */

exports.Formatter = Formatter;
