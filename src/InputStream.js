module.exports = class InputStream {
  constructor(input) {
    this.input = input;
    this.position = 0;
  }

  get done() {
    return this.position >= this.input.length;
  }

  get current() {
    return this.input[this.position];
  }

  readWhile(test) {
    let readed = '';

    while (!this.done && test(this.current)) {
      readed += this.current;
      this.position += 1;
    }

    return readed;
  }
};
