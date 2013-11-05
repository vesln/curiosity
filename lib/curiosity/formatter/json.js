exports.print = function(prodStats, testStats) {
  var ret = {
    production: prodStats.result(),
    test: testStats.result(),
  };

  console.log(JSON.stringify(ret, null, 2));
};
