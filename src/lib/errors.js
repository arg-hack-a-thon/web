
export class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor.name)
  }
}

export class HTTPError extends ExtendableError {
  constructor(m, errorCode, data) {
    super(m);
    this.errorCode = errorCode;
    this.data = data;
  }
}
