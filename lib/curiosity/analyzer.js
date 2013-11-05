exports.analyze = function(stats) {
  var len = stats.length;
  var ret = {};
  var files = [];
  var total = {};

  stats.forEach(function(stat) {
    var result = stat.result();

    files.push({ filename: stat.file, result: result });

    result.forEach(function(item) {
      total[item.key] = total[item.key] || { total: 0 };
      total[item.key].total += item.total;
    });
  });

  Object.keys(total).forEach(function(key) {
    total[key].average = +(total[key].total / len).toFixed(2);
  });

  return {
    files: files,
    total: { files: len, result: total }
  };
};
