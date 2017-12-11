const assert = require('assert');
const InputStream = require('../src/InputStream');

describe('InputStream', () => {
  it('should return current character', () => {
    const stream = new InputStream('abcd');
    assert.strictEqual(stream.current, 'a');
  });

  it('should read while test function is passed', () => {
    const stream = new InputStream('012345678');
    const numbers = stream.readWhile(char => /[0-3]/.test(char));
    assert.strictEqual(numbers, '0123');
  });
});
