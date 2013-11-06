/**
 * Core dependencies.
 */

var path = require('path');
var find = require('shelljs').find;

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
  var ignored = [];
  var lib = [];

  (ignore || []).forEach(function(path) {
    ignored = ignored.concat(findr(path));
  });

  dirs.forEach(function(path) {
    var files = findr(path).filter(function(file) {
      return ignored.indexOf(file) === -1;
    });

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
 * Find all .js files in directory (recursively).
 *
 * @param {String} dir
 * @returns {Array}
 * @api private
 */

function findr(dir) {
  var full = path.normalize(dir);

  return find(full).filter(function(file) {
    return file.match(/\.js$/);
  });
}

/**
 * Export `Formatter`.
 */

exports.Formatter = Formatter;
