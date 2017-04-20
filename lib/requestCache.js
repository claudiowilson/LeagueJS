/**
 * Simple in Memory Implementation
 */
class RequestCache {

  constructor() {
    this._cache = {};
  }

  get(request, ttl) {
      return new Promise((resolve, reject) => {
        reject('Not Found or Invalid');
      });
  }

  set(request, value) {

  }

}

module.exports = RequestCache;