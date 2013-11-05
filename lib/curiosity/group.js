var esprima = require('esprima');
var fs = require('fs');

function Group(files) {
  this.files = files;
}

Group.prototype.each = function(fn, ctx) {
  this.files.forEach(function(file) {
    var data = fs.readFileSync(file, 'utf8');

    try {
      var ast = esprima.parse(data, { tokens: true, comments: true });
      fn.call(ctx, ast, file, data);
    } catch (e) {
      // Esprima couldn't parse this file, not much to do about it
    }
  });
};

module.exports = Group;
