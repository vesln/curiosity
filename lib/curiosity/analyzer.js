exports.analyze = function(stats) {
  var len = stats.length;
  var ret = {};

  stats.forEach(function(stat) {
    stat.result().forEach(function(item) {
      ret[item.key] = ret[item.key] || { total: 0 };
      ret[item.key].total += item.total;
    });
  });

  Object.keys(ret).forEach(function(key) {
    ret[key].average = +(ret[key].total / len).toFixed(2);
  });

  if (len > 0) {
    ret.files = { total: len };
  }

  return ret;
};
