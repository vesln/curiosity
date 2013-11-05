/**
 * Bundle an array of stats.
 *
 * @param {Array} stats
 * @returns {Object}
 * @api public
 */

exports.bundle = function(stats) {
  var len = stats.length;
  var ret = {};
  var files = [];
  var total = {};

  stats.forEach(function(stat) {
    var result = stat.result();

    Object.keys(result).forEach(function(key) {
      total[key] = total[key] || { count: 0 };
      total[key].count += result[key].count;
    });

    files.push({ filename: stat.file, result: result });
  });

  Object.keys(total).forEach(function(key) {
    total[key].average = +(total[key].count / len).toFixed(2);
  });

  return {
    files: files,
    total: { files: len, result: total }
  };
};
