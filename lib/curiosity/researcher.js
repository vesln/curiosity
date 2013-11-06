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
 *r@param {Object} node or token
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
    case 'Boolean':
    case 'Identifier':
    case 'Null':
    case 'Numeric':
    case 'RegularExpression':
    case 'EmptyStatement':
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
  this.inc('Lines', linesLen(data));
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
 * Handle function calls.
 *
 * @param {Object} node
 * @api private
 */

Researcher.prototype.fncall = function(node) {
  var callee = node.callee;

  if (callee.type === 'Identifier' && callee.name === 'require') {
    this.inc('Require');
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
