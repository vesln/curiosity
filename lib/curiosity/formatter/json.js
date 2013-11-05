/**
 * Core dependencies.
 */

var inherits = require('util').inherits;

/**
 * Internal dependencies.
 */

var Formattter = require('../formatter');

/**
 * JSON formatter.
 *
 * @constructor
 */

function Json() {
  Formattter.apply(this, arguments);
}

/**
 * Inherit from `Formattter`.
 */

inherits(Json, Formattter);

/**
 * Print the result.
 *
 * @api public
 */

Json.prototype.run = function() {
  this.print(JSON.stringify(this.data, null, 2));
};

/**
 * Primary exports.
 */

module.exports = Json;
