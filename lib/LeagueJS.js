'use strict';

// const rate = require('./rateInfo');

// const compatibility = require('./compatibility');

// Endpoints

const SummonerEndpoint = require('./endpoints/SummonerEndpoint');
const LeagueUtil = require('./LeagueUtil');


const DEFAULT_PLATFORM_ID = 'na1';
/**
 * Main Class for the API Wrapper
 */
class LeagueJS extends LeagueUtil{

	/**
	 * Create ApiWrapper and require API_KEY to be set
	 */
	constructor(options = {}) {
		super();
		this.config = LeagueUtil.getConfig(options);

		if (typeof this.config.API_KEY === 'undefined' || this.config.API_KEY === '') {
			throw new Error('The API_KEY is needed.');
		}

		if (typeof this.config.PLATFORM_ID === 'undefined' || this.config.PLATFORM_ID === '') {
			console.log(`No PLATFORM_ID given in League constructor or Node Environment. Using ${DEFAULT_PLATFORM_ID} as default`);
			this.config.PLATFORM_ID = DEFAULT_PLATFORM_ID;
		}

		// rate.setLimits = this.config.limits; // TODO: add when reworking RateLimiter

		// setting the Endpoints explicitly for better code completion and IDE support
		this.Summoner = new SummonerEndpoint(this.config, LeagueUtil.getPlatformIds());

		/** Array to be able to replace cahes for all endpoints */
		this._endpoints = [
			this.Summoner,
		];
	}

	/**
	 * Sets a new Cache type or options for all endpoints
	 * @param options
	 * @param Constructor
	 */
	setCache(options, Constructor){
		this._endpoints.forEach(endpoint => {
			endpoint.setCache(options, Constructor);
		});
	}

	flushCache() {
		this._endpoints.forEach(endpoint => {
			endpoint.flushCache();
		});
	}

	enableCaching(){
		this._endpoints.forEach(endpoint => {
			endpoint.enableCaching();
		});
	}
	disableCaching(){
		this._endpoints.forEach(endpoint => {
			endpoint.disableCaching();
		});
	}
}

// Add the Comaptibility layer to the wrapper
// compatibility(LeagueJS); // TODO: add again if still neccessary

module.exports = LeagueJS;