const ApiRequest = require('../ApiRequest');
const RateLimiter = require('../RateLimiter');
/**
 * Riot API Endpoint
 */
class Endpoint {

	/**
	 * Create new Endpoint based on Config
	 */
	constructor(config, platformIds) {
		this.config = config;
		this.apiVersion = this.config.API_VERSION;
		// NOTE: will be amended by implementing Endpoints
		this.apiUrl = `https://{platformId}.${this.config.API_HOST}/lol`;

		this.rateLimiter10 = {};
		this.rateLimiter600 = {};

		// TODO: optimize ratelimiter handling with new RateInfo
		platformIds.forEach(platformId => {
			this.rateLimiter10[platformId] = new RateLimiter(this.config.limits.per10, 10 * 1000, this.config.limits.allowBursts);
			this.rateLimiter600[platformId] = new RateLimiter(this.config.limits.per600, 600 * 1000, this.config.limits.allowBursts);
		});
	}

	/**
	 *
	 * @private
	 * @param endpointUrl the alternating url component for the respective endpoint
	 * @param platformId
	 * @param query options query without api_key
	 * @returns {string} request url
	 */
	_buildURL(endpointUrl, platformId = this.config.PLATFORM_ID, query = '') {
		return `${this.apiUrl.replace(/\{platformId\}/, platformId)}${endpointUrl}?${query}&api_key=${this.config.API_KEY}`;
	}

	/**
	 * Execute a APIRequest based on the Config of this Endpoint
	 *
	 * if there is a Cached version of the request it will be used instead of making a request against the server
	 */
	executingRequest(endpointUrl, platformId = this.config.PLATFORM_ID, query = '') {
		// TODO: add configurable retries on 503 - {maxRetries: number, retryIntervalMS: number, retryEndpoints: Array}

		// TODO: rework ratelimit scheduling - 1:1 adaption from previous handling
		return this.rateLimiter10[platformId]
			.scheduling(
				() => this.rateLimiter600[platformId].scheduling(
					() => ApiRequest.execute(this._buildURL(endpointUrl, platformId, query))
				)
			);
	}
}

module.exports = Endpoint;