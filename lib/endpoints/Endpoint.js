const ApiRequest = require('../ApiRequest');
const RateLimiter = require('../RateLimiter');

const ParameterError = require('../errors/ParameterError');
const EndpointUtil = require('./EndpointUtil');
/**
 * Riot API Endpoint
 */
class Endpoint {

	/**
	 * Create new Endpoint based on Config
	 */
	constructor(name, config, platformIds) {
		if(arguments.length !== 3){
			throw new ParameterError('Endpoint expects 3 Parameter: name: string, config: JSON, platformIds: Array');
		}

		this.name = name;

		// cloning config to have independent Options per Endpoint!
		this.config = Object.assign({}, config);

		this.apiVersion = this.config.API_VERSION;
		// NOTE: will be amended by implementing Endpoints
		this.apiUrl = `https://{platformId}.${this.config.API_HOST}/lol`;

		if (this.config.caching.isEnabled) {this.setCache(this.config.caching.defaults);}

		this.rateLimiter10 = {};
		this.rateLimiter600 = {};

		// TODO: optimize ratelimiter handling with new RateInfo
		platformIds.forEach(platformId => {
			this.rateLimiter10[platformId] = new RateLimiter(this.config.limits.per10, 10 * 1000, this.config.limits.allowBursts);
			this.rateLimiter600[platformId] = new RateLimiter(this.config.limits.per600, 600 * 1000, this.config.limits.allowBursts);
		});
	}

	enableCaching(options = this.config.caching.defaults, Constructor = this.config.caching.constructor){
		this.config.caching.isEnabled = true;
		this.setCache(options, Constructor);
	}
	disableCaching(){
		this.config.caching.isEnabled = false;
	}
	setCache(options, Constructor = this.config.caching.constructor) {
		if (!options) {
			throw new Error('options are required to set a new cache');
		}
		this.config.caching.constructor = Constructor;
		this.cache = new Constructor(options);
	}

	flushCache() {
		this.cache.flushAll();
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
		return `${this.apiUrl.replace(/\{platformId\}/, platformId)}${endpointUrl}?${query}`;
	}

	/**
	 * Execute a APIRequest based on the Config of this Endpoint
	 *
	 * if there is a Cached version of the request it will be used instead of making a request against the server
	 */
	executingRequest(endpointUrl, platformId = this.config.PLATFORM_ID, query = '') {
		// TODO: add configurable retries on 503 - {maxRetries: number, retryIntervalMS: number, retryEndpoints: Array}

		EndpointUtil.throwIfInvalidPlatformId(platformId);

		const requestUrl = this._buildURL(endpointUrl, platformId, query);
		const cacheValue = this.cache ? this.cache.get(requestUrl) : null;

		if (cacheValue) {
			return Promise.resolve(cacheValue);
		} else {
			// TODO: rate-limiting should be disabled for Static-data endpoint
			// TODO: rework ratelimit scheduling - 1:1 adaption from previous handling
			return this.rateLimiter10[platformId].scheduling(
				() => this.rateLimiter600[platformId].scheduling(
					() => ApiRequest.executing(requestUrl, {token: this.config.API_KEY})
				)
			).then(response => {
				if (this.cache) {this.cache.set(requestUrl, response);}
				return response;
			});
		}
	}
}

module.exports = Endpoint;