exports.print = function(group, out) {
  out.write(JSON.stringify(group, null, 2) + '\n');
};
