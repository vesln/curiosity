exports.print = function(prod, tests, out) {
  var ret = { production: prod, tests: tests };
  out.write(JSON.stringify(ret, null, 2) + '\n');
};
