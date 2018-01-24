const InputStream = require('./InputStream');

const KEYWORDS = [
  'bool',
  'number',
  'string',
  'func'
];

const isKeyword = string => KEYWORDS.indexOf(string) > -1;

const isWhitespace = char => /\s/.test(char);
const isQuote = char => char === '"' || char === "'";
const isDigit = char => /[0-9]/.test(char);
const isWord = char => /[A-Za-z0-9_]/.test(char);
const isSpecial = char => '.,:(){}[]'.indexOf(char) > -1;

module.exports = class Tokenizer {
  constructor(input) {
    this.stream = new InputStream(input);
  }

  readString() {
    const { stream } = this;

    stream.next();
    const string = stream.readWhile(char => !isQuote(char));
    stream.next();

    return string;
  }

  readNumber() {
    const { stream } = this;
    let hasDot = false;

    const number = stream.readWhile((char) => {
      if (char === '.') {
        if (hasDot) return false;
        hasDot = true;
        return true;
      }

      return isDigit(char);
    });

    return hasDot ? parseFloat(number) : parseInt(number);
  }

  skipComment() {
    const { stream } = this;
    const next = stream.next();

    if (next === '/') {
      stream.readWhile(char => char !== '\n');
    } else if (next === '*') {
      let mightEnd = false;

      stream.readWhile(char => {
        if (char === '*') {
          mightEnd = true;
          return true;
        }

        if (char === '/' && mightEnd) {
          return false;
        }

        mightEnd = false;
        return true;
      });
    }
  }

  next() {
    const { stream } = this;
    stream.readWhile(isWhitespace);

    if (stream.current === '/') {
      this.skipComment();
      return this.next();
    }

    if (isQuote(stream.current)) {
      const value = this.readString();
      return { type: 'string', value };
    }

    if (isDigit(stream.current)) {
      const value = this.readNumber();
      return { type: 'number', value };
    }

    if (isWord(stream.current)) {
      const value = stream.readWhile(isWord);
      const type = isKeyword(value) ? 'keyword' : 'word';
      return { type, value };
    }

    if (isSpecial(stream.current)) {
      return { type: 'special', value: stream.current };
    }
  }
};
