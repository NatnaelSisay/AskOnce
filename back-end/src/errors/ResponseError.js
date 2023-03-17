function ResponseError(statusCode, body) {
  this.statusCode = statusCode;
  this.body = body;
}
module.exports = ResponseError;
