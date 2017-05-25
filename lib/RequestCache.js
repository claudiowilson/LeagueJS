const NodeCache = require('node-cache'); // https://www.npmjs.com/package/node-cache

/**
 * simple in-memory implementation
 * @see {@link https://www.npmjs.com/package/node-cache}
 */
class RequestCache extends NodeCache{

  constructor(options) {
    super(options);
  }
}

module.exports = RequestCache;