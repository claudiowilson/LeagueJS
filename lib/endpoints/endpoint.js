const url = require('url');
const Request = require('../apiRequest');
const rate = require('../rateInfo');
const RateError = require('../errors/RateError');

/**
 * Riot API Endpoint
 */
class Endpoint {

  /**
   * Create new Endpoint based on Config
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Create a Request URL for the given parameters
   */
  static buildURL(api, region, endpoint, params, token) {

    let p = '';

    if(Array.isArray(params)) {
      p = params.map(v => {
        return v.toLowerCase();
      }).join(',');
    } else {
      p = params.toLowerCase();
    }

    return url.parse(`https://${api}/${region}${endpoint}/${p}?api_key=${token}`);
  }

  /**
   * Execute a APIRequest based on the Config of this Endpoint
   * 
   * if there is a Cached version of the request it will be used instead of making a request against the server
   */
  executeRequest(request) {
    return new Promise( (resolve, reject) => {
      Request.cache.get(request.target.href).then(
        data => {
          resolve(data);
        },
        err => {
          if(rate.insideLimit()){
            request.execute().then(
              data => {
                console.log(data);
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