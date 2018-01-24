const assert = require('assert');
const InputStream = require('../src/InputStream');

describe('InputStream', () => {
  it('should return current character', () => {
    const stream = new InputStream('abcd');
    assert.strictEqual(stream.current, 'a');
  });

  it('should read next char and move cursor', () => {
    const stream = new InputStream('abcd');
    assert.strictEqual(stream.next(), 'b');
  });

  it('should read while test function is passing', () => {
    const stream = new InputStream('012345678');
    stream.readWhile(char => /[0-3]/.test(char));
    assert.strictEqual(stream.current, '4');
  });

  it('should return read string', () => {
    const stream = new InputStream('myname2517');
    const string = stream.readWhile(char => /[a-z]/.test(char));
    assert.strictEqual(string, 'myname');
  });
});
