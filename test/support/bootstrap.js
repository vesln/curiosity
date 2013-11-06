/**
 * Core dependencies.
 */

var join = require('path').join;

/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Internal dependencies.
 */

global.curiosity = require('../..');

/**
 * Register `should`.
 */

global.should = chai.should();

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;

/**
 * Return path to a fixture.
 *
 * @returns {String}
 */

global.fixt = function(extra) {
  return join(__dirname, '..', 'fixtures', extra);
};
