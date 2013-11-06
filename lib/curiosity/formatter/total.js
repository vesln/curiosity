/**
 * Core dependencies.
 */

var inherits = require('util').inherits;

/**
 * Internal dependencies.
 */

var Formattter = require('../formatter');
var countable = require('../countable');

/**
 * Total formatter.
 *
 * @constructor
 */

function Total() {
  Formattter.apply(this, arguments);
}

/**
 * Inherit from `Formattter`.
 */

inherits(Total, Formattter);

/**
 * Print the result.
 *
 * @api public
 */

Total.prototype.run = function() {
  var metrics = this.data.total.result;
  var lens = {};
  var group = undefined;

  var out = [
    [ 'Metric', 'Total', 'Average/file' ],
    [ '------', '-----', '------------' ]
  ];

  lens.name = out[0][0].length;
  lens.count = out[0][1].length;

  Object.keys(metrics).forEach(function(key) {
    var name = this.name(key);
    lens.name = Math.max(lens.name, name.length);
    lens.count = Math.max(lens.count, ('' + metrics[key].count).length);
    out.push([ name, metrics[key].count, metrics[key].average, key ]);
  }, this);

  this.print();

  for (var i = 0, len = out.length; i < len; i++) {
    var key = out[i][3];
    if (typeof group !== 'undefined' && group != countable[key]) this.print();
    group = countable[key];

    this.iprint([
      this.ljust(out[i][0], lens.name),
      this.ljust(out[i][1], lens.count),
      out[i][2]
    ].join('   '));
  }

  this.iprint('----------------------');
  this.iprint('Files: ' + this.data.total.files);
  this.print();
};

/**
 * Primary export.
 */

module.exports = Total;
