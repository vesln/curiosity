module.exports = process.env.CURIOSITY_COV
  ? require('./lib-cov/curiosity')
  : require('./lib/curiosity');
