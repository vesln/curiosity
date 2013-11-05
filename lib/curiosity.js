var Group = require('./curiosity/group');
var Stats = require('./curiosity/stats');
var Researcher = require('./curiosity/researcher');

exports.analyzeFiles = function(files) {
  var stats = new Stats;
  var group = new Group(files);
  var researcher = new Researcher(stats);

  group.each(function(ast, file, data) {
    researcher.filename(file);
    researcher.data(data);

    (function walk(node) {
      var key = null;
      var child = null;

      if (node.type) researcher.node(node);

      Object.keys(node).forEach(function(key) {
        child = node[key];
        if (Object(child) === child) walk(child);
      });
    })(ast);

  });

  return stats;
};
