exports.analyze = function(stats) {
  var len = stats.length;
  var keys = {};

  stats.forEach(function(stat) {
    var res = stat.result();

    Object.keys(res).forEach(function(key) {
      keys[key] = keys[key] || { total: 0 };
      keys[key].total += res[key].total;
    });
  });

  Object.keys(keys).forEach(function(key) {
    keys[key].average = keys[key].total / len;
  });

  if (len > 0) {
    keys.files = { total: len };
  }

  return keys;
};
