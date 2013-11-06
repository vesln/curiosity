var path = require('path');
var nixt = require('nixt');
var bin = path.join(__dirname, '..', 'bin');

var app = function() {
  return nixt({ newlines: false })
    .cwd(bin)
    .base('./curiosity ')
    .clone();
};

var fixt = function(extra) {
  return path.join(__dirname, 'fixtures', extra);
};

describe('cli', function() {
  describe('--version', function() {
    it('returns the app version', function(done) {
      app()
      .stdout(require('../package.json').version)
      .run('--version')
      .end(done);
    });
  });

  describe('--formatters', function() {
    it('returns all available formatters', function(done) {
      app()
      .stdout(/json/)
      .run('--formatters')
      .end(done);
    });
  });

  describe('--ignore', function() {
    it('will ignore a folder or a file', function(done) {
      app()
      .stdout(/File Lines\s*0/)
      .run('--ignore ' + fixt('cli/ignore.js') + ' ' + fixt('cli'))
      .end(done);
    });
  });

  describe('--formatter', function() {
    it('uses different formatters', function(done) {
      app()
      .run('--formatter json ' + fixt('cli'))
      .expect(function(result) {
        JSON.parse(result.stdout);
      })
      .end(done);
    });
  });

  describe('main', function() {
    it('analyzes the supplied path', function(done) {
      app()
      .stdout(/File Lines\s*1/)
      .run(fixt('cli'))
      .end(done);
    });
  });
});
