/**
 * Core dependencies.
 */

var basename = require('path').basename;

/**
 * Internal dependencies.
 */

var countable = require('./countable');

/**
 * Researcher.
 *
 * @param {Stats} stats
 * @constructor
 */

function Researcher(stats) {
  this.stats = stats;

  Object.keys(countable).forEach(function(key) {
    this.inc(key, 0);
  }, this);
}

/**
 * Analyze nodes and tokens.
 *
 * @param {Object} node or token
 * @api public
 */

Researcher.prototype.node = function(node) {
  switch (node.type) {
    case 'AssignmentExpression':
    case 'ArrayExpression':
    case 'ConditionalExpression':
    case 'DoWhileStatement':
    case 'ForStatement':
    case 'ForInStatement':
    case 'FunctionDeclaration':
    case 'FunctionExpression':
    case 'IfStatement':
    case 'ObjectExpression':
    case 'SwitchStatement':
    case 'ReturnStatement':
    case 'ThrowStatement':
    case 'TryStatement':
    case 'VariableDeclarator':
    case 'WhileStatement':
    case 'LabelStatement':
    case 'BreakStatement':
    case 'ContinueStatement':
    case 'EmptyStatement':
    case 'Boolean':
    case 'Identifier':
    case 'Null':
    case 'Numeric':
    case 'RegularExpression':
    case 'String':
      return this.inc(node);

    case 'Line':
    case 'Block':
      return this.inc('Comment');

    case 'CallExpression':
      return this.fncall(node);

    case 'Punctuator':
      return this.punctuator(node);
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
  this.inc('FileLine', linesLen(data));
};

/**
 * Increment a counter.
 *
 * @param {String|Object} type / node
 * @api private
 */

Researcher.prototype.inc = function(node, inc) {
  this.stats.inc(Object(node) === node ? node.type : node, inc);
};

/**
 * Handle semicolons.
 *
 * @param {Object} token
 * @api private
 */

Researcher.prototype.punctuator = function(token) {
  if (token.value !== ';') return;
  this.inc('Semicolon');
};

/**
 * Handle function calls and count requires.
 *
 * This assumes quite a bit. For instance it simply thinks
 * that any `require` call is the Node `require`. While
 * this might not be true, a proper detection would be a little
 * bit too much for the purposes of this library.
 *
 * @param {Object} node
 * @api private
 */

Researcher.prototype.fncall = function(node) {
  var callee = node.callee;

  if (callee.type === 'Identifier' && callee.name === 'require') {
    this.inc('RequireCall');
  }

  this.inc(node.type);
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
