const requestP = require('request-promise');
// const rate = require('./rateInfo');

const ParameterError = require('./errors/ParameterError');

class ApiRequest {

	/***
	 * Executes the request to the url set at construction.
	 *
	 * Sets the new rate-limit header and returns the response as json or raw,
	 * depending on the response's content-type header
	 * @param {string} url for the request
	 * @param {boolean} resolveWithFullResponse if true, the given Promise will resolve into the full response
	 */
	static execute(url, resolveWithFullResponse = false) {
		if (!url) {
			throw new ParameterError('URL has to be provided for the ApiRequest');
		}

		let options = {
			url: url,
			method: 'GET',
			resolveWithFullResponse,
			transform: (body, response, resolveWithFullResponse) => {
				// if ('x-rate-limit-count' in response.headers) { // TODO: handle this within Endpoint!?
				// 	rate.update(response.headers['x-rate-limit-count']);
				// }
				if (resolveWithFullResponse) {
					return response;
				} else if (response.headers['content-type'].indexOf('application/json') !== -1) {
					// indexOf to account for "Content-Type": "application/json;charset=utf-8"
					return JSON.parse(body);
				} else {
					return body;
				}
			}
		};

		// TODO: add request caching
		// return new Promise((resolve, reject) => {
		// 	Request.cache.get(request.target.href).then(
		// 		data => {
		// 			resolve(data);
		// 		},
		// 		err => {
		// TODO: this only checks and rejects requests outside the rate-limit, but does not actually use the rate-limiter
		// 			if (rate.insideLimit()) {
		// 				request.execute().then(
		// 					data => {
		// 						resolve(data);
		// 					},
		// 					err => {
		// 						reject(err);
		// 					}
		// 				);
		// 			} else {
		// 				reject(new RateError());
		// 			}
		// 		}
		// 	);
		// });


		return requestP(options);
	}
}

module.exports = ApiRequest;