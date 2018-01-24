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

  next() {
    this.position += 1;
    return this.current;
  }

  readWhile(test) {
    let read = '';

    while (!this.done && test(this.current)) {
      read += this.current;
      this.position += 1;
    }

    return read;
  }
};
