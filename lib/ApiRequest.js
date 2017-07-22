const requestP = require('request-promise');
// const rate = require('./rateInfo');

const Bluebird = require('bluebird');

const ParameterError = require('./errors/ParameterError');

class ApiRequest {

	/***
	 * Executes the request to the url set at construction.
	 *
	 * Sets the new rate-limit header and returns the response as json or raw,
	 * depending on the response's content-type header
	 * @param {string} url for the request
	 * @param token RIOT Api key
	 * @param {boolean} resolveWithFullResponse if true, the given Promise will resolve into the full response
	 * @param {number} numRetriesLeft amount of retries left to do on error not caused by APP rate-limit
	 * @param {number} intervalRetryMS initial time to wait until the next retry on errors from RIOT's underlying
	 * systems. Will increase exponentially with each retry
	 */
	static executing(url, {token, resolveWithFullResponse = false, numRetriesLeft = 3, intervalRetryMS = 1000} = {}) {
		return Bluebird.resolve()
			.then(() => {
				if (!url) {
					throw new ParameterError('URL has to be provided for the ApiRequest');
				}
				if (!token) {
					throw new ParameterError('token has to be provided for the ApiRequest');
				}

				let options = {
					url: url,
					method: 'GET',
					headers: {
						'X-Riot-Token': token
					},
					resolveWithFullResponse,
					transform: (body, response, resolveWithFullResponse) => {
						// if ('x-rate-limit-count' in response.headers) { // TODO: handle this within Endpoint!?
						// 	rate.update(response.headers['x-rate-limit-count']);
						// }

						// return full response on error (non 2XX status)
						if (!(response.statusCode >= 200 && response.statusCode < 300)) {
							return response;
						}
						if (resolveWithFullResponse) {
							return response;
						} else if (response.headers['content-type'] && response.headers['content-type'].indexOf('application/json') !== -1) {
							// indexOf to account for "Content-Type": "application/json;charset=utf-8"
							return JSON.parse(body);
						} else {
							return body;
						}
					}
				};

				return requestP(options).catch(err => {
					// retry on falsy 429 or on 503
					const is429Bug = err.statusCode === 429 && (!err.response.headers['retry-after']);
					if (numRetriesLeft > 0 && (is429Bug || err.statusCode === 503 || err.statusCode === 500)) {
						numRetriesLeft--;
						return Bluebird
							.delay(intervalRetryMS)
							.then(() => ApiRequest.executing(url, { // TODO: unit test
								token,
								resolveWithFullResponse,
								numRetriesLeft,
								intervalRetryMS: intervalRetryMS * 2 // backing off exponentially
							}));
					}
					// console.log(JSON.stringify(err, null, 2));
					throw err;
				});

			});
	}
}

module.exports = ApiRequest;