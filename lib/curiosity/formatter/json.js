exports.print = function(prodStats, testStats, out) {
  var ret = {
    production: prodStats.result(),
    test: testStats.result(),
  };

  out.write(JSON.stringify(ret, null, 2) + '\n');
};
