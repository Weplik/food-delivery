function RequestError(httpCode, message, errors) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.name = 'RequestError';
  this.httpCode = httpCode;
  this.message = message;
  this.errors = errors;
}

// eslint-disable-next-line no-proto
RequestError.prototype.__proto__ = Error.prototype;

module.exports = RequestError;
