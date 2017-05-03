const url = require('url');
const ApiRequest = require('../apiRequest');
const rate = require('../rateInfo');
const RateError = require('../errors/RateError');

/**
 * Riot API Endpoint
 */
class Endpoint {

  /**
   * Create new Endpoint based on Config
   * 
   * @param {object} config Configuration for the Endpoint
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Create a Request for the given parameters
   * @param {object} options Options to use for this request
   * @param {string} endpoint Endpoint to use for this request
   * @param {string|array} params Parameter or Parameters for this request
   * @param {string} query HTTP Query string to append to this request
   */
  buildRequest(options, endpoint, params, query = '') {

    let p = '';

    if(Array.isArray(params)) {
      p = params.map(v => {
        return v.toLowerCase();
      }).join(',');
    } else {
      p = params.toLowerCase();
    }

    let platform = this.getPlatform(options);
    let token = this.config.API_KEY;
    let api = this.config.endpoints.api;

    return new ApiRequest(url.parse(`https://${platform}.${api}${endpoint}/${p}?api_key=${token}&${query}`));
  }

  /**
   * Return the Platform to use
   * @param {object} options 
   */
  getPlatform(options = {}) {
    return (options.platform) ? options.platform : this.config.platform;
  }

  /**
   * Execute the given request
   * 
   * @param {ApiRequest} request request to execute
   */
  executeRequest(request, cacheTTL = 0) {
    return new Promise( (resolve, reject) => {
      ApiRequest.cache.get(request.target.href. cacheTTL).then(
        data => {
          resolve(data);
        },
        err => {
          if(rate.insideLimit()){
            request.execute().then(
              data => {
                resolve(data);
              },
              err => {
                reject(err);
              }
            );
          } else {
            reject(new RateError());
          }
        }
      );
    });
  }
}

module.exports = Endpoint;