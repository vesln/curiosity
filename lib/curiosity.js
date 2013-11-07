/**
 * Core dependencies.
 */

var path = require('path');
var find = require('fine');

/**
 * Internal dependencies.
 */

var Runner = require('./curiosity/runner');
var bundler = require('./curiosity/bundler');
var Formatter = require('./curiosity/formatter');

/**
 * Analyze given `files`.
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
 * Lookup & filter production and test files.
 *
 * @param {Array} files
 * @param {Array} ignored
 * @returns {Object}
 * @api public
 */

exports.lookup = function(dirs, ignore) {
  var lib = [];
  ignore = (ignore || []).map(function(dir) {
    return path.normalize(dir);
  });

  dirs.forEach(function(dir) {
    var files = find(path.normalize(dir), { ext: '.js', ignore: ignore });
    lib = lib.concat(files);
  });

  return lib;
};

/**
 * Load given formatter.
 *
 * @param {String} name
 * @returns {Function}
 * @api public
 */

exports.loadFormatter = function(name) {
  return require('./curiosity/formatter/' + name);
};

/**
 * Export `Formatter`.
 */

exports.Formatter = Formatter;
