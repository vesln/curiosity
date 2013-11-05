/**
 * Internal dependencies.
 */

var Runner = require('./curiosity/runner');
var analyzer = require('./curiosity/analyzer');

/**
 * Analyze given files.
 *
 * @param {Array} files
 * @api public
 */

exports.analyzeFiles = function(files) {
  var runner = new Runner(files);
  var results = runner.run();
  return analyzer.analyze(results);
};
