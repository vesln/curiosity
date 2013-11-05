/**
 * Core dependencies.
 */

var basename = require('path').basename;

/**
 * Researcher.
 *
 * @param {Stats} stats
 * @constructor
 */

function Researcher(stats) {
  this.stats = stats;
}

/**
 * Analyze a node.
 *
 * @param {Object} node or token
 * @api public
 */

Researcher.prototype.node = function(node) {
  switch (node.type) {
    // Nodes
    case 'AssignmentExpression': return this.inc('assignment');
    case 'ArrayExpression': return this.inc('array');
    case 'CallExpression': return this.inc('call');
    case 'ConditionalExpression': return this.inc('conditional');
    case 'DoWhileStatement': return this.inc('dowhile');
    case 'ForStatement': return this.inc('for');
    case 'ForInStatement': return this.inc('forin');
    case 'FunctionDeclaration': return this.inc('fndec');
    case 'FunctionExpression': return this.inc('fnex');
    case 'IfStatement': return this.inc('if');
    case 'ObjectExpression': return this.inc('object');
    case 'SwitchStatement': return this.inc('switch');
    case 'ReturnStatement': return this.inc('return');
    case 'ThrowStatement': return this.inc('throw');
    case 'TryStatement': return this.inc('try');
    case 'VariableDeclaration': return this.inc('vardec');
    case 'VariableDeclarator': return this.inc('vardec');
    case 'WhileStatement': return this.inc('while');
    // Tokens
    case 'Boolean': return this.inc('boolean');
    case 'Identifier': return this.inc('identifier');
    case 'Null': return this.inc('null');
    case 'Numeric': return this.inc('number');
    case 'Punctuator': return this.semicolon(node);
    case 'RegularExpression': return this.inc('regex');
    case 'String': return this.inc('string');
    // Comments
    case 'Line':
    case 'Block':
      return this.inc('comments');
  }
};

/**
 * Analyze a file.
 *
 * @param {String} filename
 * @param {String} file contents
 * @api public
 */

Researcher.prototype.file = function(filename, data) {
  this.inc('fnamelen', filenameLen(filename));
  this.inc('lines', linesLen(data));
};

/**
 * Increment a counter.
 *
 * @param {String} type
 * @api private
 */

Researcher.prototype.inc = function(type, inc) {
  this.stats.inc(type, inc);
};

/**
 * Handle semicolons.
 *
 * @param {Object} token
 * @api private
 */

Researcher.prototype.semicolon = function(token) {
  if (token.value !== ';') return;
  this.stats.inc('semicolon');
};


/**
 * Split `str` into lines and return its size.
 *
 * @param {String} str
 * @returns {Number}
 * @api private
 */

function linesLen(str) {
  return str.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/).length - 1;
}

/**
 * Return filename length.
 *
 * @param {String} path
 * @returns {Number}
 * @api private
 */

function filenameLen(file) {
  return basename(file).replace(/\.js$/, '').length;
}

/**
 * Primary export.
 */

module.exports = Researcher;
