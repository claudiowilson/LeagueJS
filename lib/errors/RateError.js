class RateError extends Error {
  constructor() {
    super('The Request limit would be exceded.');
  }
}
module.exports = RateError;