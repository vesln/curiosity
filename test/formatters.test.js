describe('formatters', function() {
  describe('JSON', function() {
    it('returns the result as json', function() {
      var json = formatter('json', { foo: 'bar' });
      json.run();
      JSON.parse(json.out.buff).should.eql({ foo: 'bar' });
    });
  });

  describe('Summary', function() {
    it('returns a summary of the result', function() {
      var result = {
        files: [
          { filename: 'foo',
            result: {
              EmptyStatement: { count: 1 },
              FileLines: { count: 1 }
            }
          },
          { filename: 'bar',
            result: {
              EmptyStatement: { count: 1 },
              FileLines: { count: 1 }
            }
          }
        ]
      };
      var summary = formatter('summary', result);
      summary.run();
      simplify(summary.out.buff).should.eq('File Sum of all metrics foo 2 bar 2');
    });
  });

  describe('Total', function() {
    it('returns averages', function() {
      var result = {
        total: {
          files: 2,
          result: {
            EmptyStatement: { count: 2, average: 2 }
          }
        }
      };
      var total = formatter('total', result);
      total.run();
      simplify(total.out.buff).should.eq('Metric Total Average/file ------ ----- ------------ Empty Statements 2 2 ---------------------- Files: 2');
    });
  });
});

function simplify(str) {
  return str.replace(/\n/g, '').replace(/[ ]{2,}/g, ' ').trim();
}

function formatter(name, result) {
  var Formatter = curiosity.loadFormatter(name);
  var stream = { buff: '' };
  stream.write = function(buff) {
    this.buff += buff;
  };
  return new Formatter(result, stream);
}
