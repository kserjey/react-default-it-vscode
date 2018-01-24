const assert = require('assert');
const Tokenizer = require('../src/Tokenizer');

describe('Tokenizer', () => {
  it('should skip whitespaces', () => {
    const tokenizer = new Tokenizer('    n');
    assert.deepStrictEqual(tokenizer.next(), { type: 'word', value: 'n' });
  });

  it('should skip single-line comments', () => {
    const tokenizer = new Tokenizer(`
      // some text
      text
    `);

    assert.deepStrictEqual(tokenizer.next(), { type: 'word', value: 'text' });
  });

  it('should skip multi-line comments', () => {
    const tokenizer = new Tokenizer(`
      /*
        hah, lol
      */
      text
    `);

    assert.deepStrictEqual(tokenizer.next(), { type: 'word', value: 'text' });
  });

  it('should read a string', () => {
    const tokenizer = new Tokenizer(`"some" 'strings'`);

    assert.deepStrictEqual(tokenizer.next(), { type: 'string', value: 'some' });
    assert.deepStrictEqual(tokenizer.next(), { type: 'string', value: 'strings' });
  });

  it('should read a number', () => {
    const tokenizer = new Tokenizer('25 26 3.14');

    assert.deepStrictEqual(tokenizer.next(), { type: 'number', value: 25 });
    assert.deepStrictEqual(tokenizer.next(), { type: 'number', value: 26 });
    assert.deepStrictEqual(tokenizer.next(), { type: 'number', value: 3.14 });
  });

  it('should read a keyword', () => {
    const tokenizer = new Tokenizer('string');
    assert.deepStrictEqual(tokenizer.next(), { type: 'keyword', value: 'string' });
  });

  it('should read a word', () => {
    const tokenizer = new Tokenizer('some_time');
    assert.deepStrictEqual(tokenizer.next(), { type: 'word', value: 'some_time' });
  });

  it('should read a special', () => {
    const tokenizer = new Tokenizer('comma,');
    tokenizer.next();
    assert.deepStrictEqual(tokenizer.next(), { type: 'special', value: ',' });
  });
});
