/**
 * Internal dependencies.
 */

var Group = require('./group');
var Stats = require('./stats');
var Researcher = require('./researcher');

/**
 * Runner.
 */

function Runner(files) {
  this.files = files;
}

Runner.prototype.run = function() {
  var group = new Group(this.files);
  var results = [];

  group.each(function(ast, file, data) {
    var stats = new Stats(file);
    var researcher = new Researcher(stats);
    researcher.file(file, data);

    (function walk(node) {
      var key = null;
      var child = null;

      if (node.type) researcher.node(node);

      Object.keys(node).forEach(function(key) {
        child = node[key];
        if (Object(child) === child) walk(child);
      });
    })(ast);

    results.push(stats);
  });

  return results;
};

module.exports = Runner;
