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
