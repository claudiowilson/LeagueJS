const ApiRequest = require('../ApiRequest');

/**
 * Riot API Endpoint
 */
class Endpoint {

	/**
	 * Create new Endpoint based on Config
	 */
	constructor(config) {
		this.config = config;
		this.apiVersion = this.config.API_VERSION;
		// NOTE: will be amended by implementing Endpoints
		this.apiUrl = `https://{platformId}.${this.config.API_HOST}/lol`;
	}

	/**
	 *
	 * @param endpointUrl the alternating url component for the respective endpoint
	 * @param platformId
	 * @param query options query without api_key
	 * @returns {string} request url
	 */
	buildURL(endpointUrl, platformId = this.config.PLATFORM_ID, query = '') {
		return `${this.apiUrl.replace(/\{platformId\}/, platformId)}${endpointUrl}?${query}&api_key=${this.config.API_KEY}`;
	}

	/**
	 * Execute a APIRequest based on the Config of this Endpoint
	 *
	 * if there is a Cached version of the request it will be used instead of making a request against the server
	 */
	static executingRequest(url) {
		return ApiRequest.execute(url);
	}
}

module.exports = Endpoint;