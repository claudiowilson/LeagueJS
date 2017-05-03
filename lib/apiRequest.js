const https = require('https');
const rate = require('./rateInfo');

class ApiRequest {

  /**
   * 
   * @param {url} target 
   */
  constructor(target) {
    this.target = target;
  }

  /**
   * @returns {string} The target URL of this request
   */
  getTarget() {
    return this.target;
  }

  execute() {
    let options = {
      hostname: this.target.hostname,
      path: this.target.path,
      method: 'GET'
    };

    return new Promise((resolve, reject) => {
      let data = "";
      let req = https.request(options, (res) => {
        
        res.on('data', (chunk) => {
          data = `${data}${chunk.toString()}`;
        });

        res.on('end', () => {
          
          if('x-rate-limit-count' in res.headers) {
            rate.update(res.headers['x-rate-limit-count']);
          }

          if(res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(data);
          }
        });
      });

      req.end();

      req.on('error', (e) => {
        reject(e);
      });
    });
  }
}

module.exports = ApiRequest;