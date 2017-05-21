const requestP = require('request-promise');
const rate = require('./rateInfo');

const ParameterError = require('./errors/ParameterError');

class ApiRequest {

	constructor(url) {
		if (!url) {
			throw new ParameterError('URL has to be provided for the ApiRequest');
		}
		this.url = url;
	}

	/***
	 * Executes the request to the url set at construction.
	 *
	 * Sets the new rate-limit header and returns the response as json or raw,
	 * depending on the response's content-type header
	 * @param {boolean} resolveWithFullResponse if true, the given Promise will resolve into the full response
	 */
	execute(resolveWithFullResponse = false) {
		let options = {
			url: this.url,
			method: 'GET',
			resolveWithFullResponse,
			transform: (body, response, resolveWithFullResponse) => {
				if ('x-rate-limit-count' in response.headers) {
					rate.update(response.headers['x-rate-limit-count']);
				}
				if (resolveWithFullResponse) {
					return response;
				} else if (response.headers['content-type'] === 'application/json') {
					return JSON.parse(body);
				} else {
					return body;
				}
			}
		};

		return requestP(options);
	}
}

module.exports = ApiRequest;