function Researcher(stats) {
  this.stats = stats;
}

Researcher.prototype.node = function(node) {
  switch (node.type) {
    case 'String':
      return this.str(node);

    case 'Numeric':
      return this.stats.inc('numbers');

    case 'Punctuator':
      if (node.value !== ';') break;
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

Researcher.prototype.data = function(data) {
};

module.exports = Researcher;
