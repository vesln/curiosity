var path = require('path');

describe('curiosity#analyzeFiles', function() {
  it('returns the desired code metrics', function() {
    var result = analyze('counters');

    result.files.should.have.lengthOf(2);

    path.basename(result.files[0].filename).should.eq('a.js');
    path.basename(result.files[1].filename).should.eq('b.js');

    result.files[0].result.VariableDeclarator.count.should.eq(1);
    result.files[1].result.VariableDeclarator.count.should.eq(1);

    result.total.files.should.eq(2);
    result.total.result.VariableDeclarator.should.eql({
      average: 1,
      count: 2,
    });
  });

  it('counts all type of comments as one', function() {
    var result = analyze('special-cases/comment.js');

    result.total.result.Comment.should.eql({
      average: 3,
      count: 3,
    });
  });

  it('counts semicolons', function() {
    var result = analyze('special-cases/semicolons.js');

    result.total.result.Semicolon.should.eql({
      average: 3,
      count: 3,
    });
  });

  it('counts file lines', function() {
    var result = analyze('special-cases/lines.js');

    result.total.result.FileLine.should.eql({
      average: 3,
      count: 3,
    });
  });

  it('counts require calls', function() {
    var result = analyze('special-cases/require.js');

    result.total.result.RequireCall.should.eql({
      average: 3,
      count: 3,
    });
  });
});

function analyze(path) {
  var fixtures = fixt(path);
  var files = curiosity.lookup([fixtures]);
  return curiosity.analyzeFiles(files);
}
