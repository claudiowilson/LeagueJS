'use strict';

const conf = require('./config');
const rate = require('./rateInfo');

// const compatibility = require('./compatibility');

// Endpoints

const SummonerEndpoint = require('./endpoints/SummonerEndpoint');
const DEFAULT_PLATFORM_ID = 'na1';

/**
 * Main Class for the API Wrapper
 */
class LeagueJS {

	/**
	 * Create ApiWrapper and require API_KEY to be set
	 */
	constructor(options = {}) {
		this.config = {};
		Object.assign(this.config, conf, options);

		if (typeof this.config.API_KEY === 'undefined' || this.config.API_KEY === '') {
			throw new Error('The API_KEY is needed.');
		}

		if (typeof this.config.PLATFORM_ID === 'undefined' || this.config.PLATFORM_ID === '') {
			console.log(`No PLATFORM_ID given in League constructor or Node Environment. Using ${DEFAULT_PLATFORM_ID} as default`);
			this.config.PLATFORM_ID = DEFAULT_PLATFORM_ID;
		}

		// Request.cache = new conf.caching.cache(this.config); // TODO: add when RequestCache is implemented
		rate.setLimits = this.config.limits;

		this.summoner = new SummonerEndpoint(this.config);
	}
}

// Add the Comaptibility layer to the wrapper
// compatibility(LeagueJS); // TODO: add again if still neccessary

module.exports = LeagueJS;