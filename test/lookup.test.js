var path = require('path');

describe('curiosity#lookup', function() {
  it('returns all files in a directory, except the ignored', function() {
    var files = curiosity.lookup([fixt('counters')], [fixt('counters/a.js')]);

    files.should.have.lengthOf(1);
    path.basename(files[0]).should.eq('b.js');
  });
});
