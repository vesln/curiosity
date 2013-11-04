var Group = require('./curiosity/group');
var Stats = require('./curiosity/stats');

var nodeChildren = require('./curiosity/util');

var MESSAGES = {
  strings: 'Strings',
  numbers: 'Numbers',
  semicolons: 'Semicolons'
};

function Researcher(stats) {
  this.stats = stats;
}

Researcher.prototype.token = function(token) {
  switch (token.type) {
    case 'String':
      return this.str(token);

    case 'Numeric':
      return this.stats.inc('num');

    case 'Punctuator':
      if (token.value !== ';') break;
      this.stats.inc('semicolons');
      return;
  }
};

Researcher.prototype.str = function(token) {
  this.stats.inc('strings');
  this.stats.count('strlen', token.value.length);
};

Researcher.prototype.filename = function(file) {
};

Researcher.prototype.node = function(node) {
};

Researcher.prototype.data = function(data) {
};

exports.analyzeFiles = function(files) {
  var stats = new Stats;
  var group = new Group(files);
  var researcher = new Researcher(stats);

  group.each(function(ast, file, data) {
    researcher.filename(file);
    researcher.data(data);
    ast.tokens.forEach(function(token) {
      researcher.token(token);
    });
  });

  console.log(stats);

  return stats;
};
