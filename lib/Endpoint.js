const ApiRequest = require('./ApiRequest');

const ParameterError = require('./errors/ParameterError');
const ErrorUtil = require('./util/ErrorUtil');
const RegionAndPlatformUtil = require('./util/RegionAndPlatformUtil');

/**
 * Riot API Endpoint
 */
class Endpoint {

	/**
	 * Create new Endpoint based on Config
	 */
	constructor(name, config, rateLimiter) {
		if (rateLimiter){
			ErrorUtil.throwIfNotRateLimiter(rateLimiter, 'rateLimiter');
		}
		if (arguments.length < 2) {
			throw new ParameterError('Endpoint expects 2 mandatory Parameter and 1 optional Parameter: ' +
				'mandatory: (name: string, config: JSON), optional: rateLimiter');
		}

		this.name = name;

		// cloning config to have independent Options per Endpoint!
		this.config = Object.assign({}, config);

		this.apiVersion = this.config.API_VERSION;
		// NOTE: will be amended by implementing Endpoints
		this.apiUrl = `https://{platformId}.${this.config.API_HOST}/lol`;
		this.requestOptions = {token: this.config.API_KEY};
		if (this.config.limits.retryEndpoints.indexOf(this.name) !== -1){
			this.requestOptions.numRetriesLeft = this.config.limits.numMaxRetries;
			this.requestOptions.intervalRetryMS = this.config.limits.intervalRetryMS;
		}

		if (this.config.caching.isEnabled) {this.setCache(this.config.caching.defaults);}
		if (rateLimiter) { this.rateLimiter = rateLimiter; }

	}

	enableCaching(options = this.config.caching.defaults, Constructor = this.config.caching.constructor) {
		this.config.caching.isEnabled = true;
		this.setCache(options, Constructor);
	}

	disableCaching() {
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
	 * This request will be rate limited IF a ratelimiter is set for this endpoint.
	 * if there is a Cached version of the request it will be used instead of making a request against the server
	 *
	 * @see {@link Endpoint.executingRequestWithRateLimit}
	 * @see {@link Endpoint.executingRequestWithoutRateLimit}
	 */
	executingRequest(endpointUrl, platformIdOrRegion = this.config.PLATFORM_ID, query = '') {
		const platformId = RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion(platformIdOrRegion);
		if (this.rateLimiter) {
			return this.executingRequestWithRateLimit(endpointUrl, platformId, query);
		} else {
			return this.executingRequestWithoutRateLimit(endpointUrl, platformId, query);
		}
	}

	/**
	 * Execute a APIRequest based on the Config of this Endpoint
	 * This request will be rate limited.
	 * if there is a Cached version of the request it will be used instead of making a request against the server
	 *
	 * NOTE: this method should only be used for Endpoints that need per-uri rate-limiting.
	 * @see {@link Endpoint.executingRequest}
	 * @see {@link Endpoint.executingRequestWithoutRateLimit}
	 */
	executingRequestWithRateLimit(endpointUrl, platformIdOrRegion = this.config.PLATFORM_ID, query = '') {
		const platformId = RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion(platformIdOrRegion);

		const requestUrl = this._buildURL(endpointUrl, platformId, query);
		const cacheValue = this.cache ? this.cache.get(requestUrl) : null;

		if (cacheValue) {
			return Promise.resolve(cacheValue);
		} else {
			return this.rateLimiter.per10[platformId].scheduling(
				() => this.rateLimiter.per600[platformId].scheduling(
					() => ApiRequest.executing(requestUrl, this.requestOptions)
				)
			).then(response => {
				if (this.cache) {this.cache.set(requestUrl, response);}
				return response;
			});
		}
	}

	/**
	 * Execute a APIRequest based on the Config of this Endpoint
	 * This request will not be rate limited.
	 * if there is a Cached version of the request it will be used instead of making a request against the server
	 *
	 * NOTE: this method should only be used for Endpoints that need per-uri rate-limiting.
	 * @see {@link Endpoint.executingRequest}
	 * @see {@link Endpoint.executingRequestWithRateLimit}
	 */
	executingRequestWithoutRateLimit(endpointUrl, platformIdOrRegion = this.config.PLATFORM_ID, query = '') {
		const platformId = RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion(platformIdOrRegion);

		const requestUrl = this._buildURL(endpointUrl, platformId, query);
		const cacheValue = this.cache ? this.cache.get(requestUrl) : null;

		if (cacheValue) {
			return Promise.resolve(cacheValue);
		} else {

			return ApiRequest.executing(requestUrl, this.requestOptions)
				.then(response => {
					if (this.cache) {this.cache.set(requestUrl, response);}
					return response;
				});
		}
	}
}

module.exports = Endpoint;