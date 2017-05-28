'use strict';

// const rate = require('./rateInfo');

// const compatibility = require('./compatibility');

// Endpoints

const SummonerEndpoint = require('./endpoints/SummonerEndpoint');
const ChampionMasteryEndpoint = require('./endpoints/ChampionMasteryEndpoint');
const ChampionEndpoint = require('./endpoints/ChampionEndpoint');
const LeagueEndpoint = require('./endpoints/LeagueEndpoint');
const LolStatusEndpoint = require('./endpoints/LolStatusEndpoint');
const MasteriesEndpoint = require('./endpoints/MasteriesEndpoint');
const MatchEndpoint = require('./endpoints/MatchEndpoint');
const RunesEndpoint = require('./endpoints/RunesEndpoint');
const SpectatorEndpoint = require('./endpoints/SpectatorEndpoint');
const StaticDataEndpoint = require('./endpoints/StaticDataEndpoint');


const LeagueUtil = require('./LeagueUtil');

const DEFAULT_PLATFORM_ID = 'na1';
/**
 * Main Class for the API Wrapper
 */
class LeagueJS extends LeagueUtil{

	/**
	 * Create ApiWrapper and require API_KEY to be set
	 * @param options.API_KEY Riot API-KEY. Can also be set as env-variable "LEAGUE_API_KEY"
	 *
	 * @param options.PLATFORM_ID Default Platform ID to use for endpoints when not provided.
	 * Can also be set as env-variable "LEAGUE_API_PLATFORM_ID"
	 *
	 * @see {@link LeagueJSDefaultConfig}
	 */
	constructor(options = {}) {
		super();
		this.config = LeagueUtil.getConfig(options);

		if (typeof this.config.API_KEY === 'undefined' || this.config.API_KEY === '') {
			throw new Error('The API_KEY is needed. Either pass it as API_KEY option of set it as process.env.LEAGUE_API_KEY');
		}

		if (typeof this.config.PLATFORM_ID === 'undefined' || this.config.PLATFORM_ID === '') {
			console.log(`No PLATFORM_ID given in League constructor or Node Environment. Using ${DEFAULT_PLATFORM_ID} as default`);
			this.config.PLATFORM_ID = DEFAULT_PLATFORM_ID;
		}

		// rate.setLimits = this.config.limits; // TODO: add when reworking RateLimiter
		let {per10, per600, allowBursts} = this.config.limits;
		this.rateLimiter = LeagueUtil.createRateLimiter(per10, per600, allowBursts);

		// setting the Endpoints explicitly for better code completion and IDE support
		// Endpoints that take a rate-limiter as constructor parameter are rate-limited.
		// Rate Limiting can be fine-tuned as Developer by using the respective request-methods within Endpoint
		// explicitly if neccessary in the future
		this.Summoner = new SummonerEndpoint(this.config, this.rateLimiter);
		this.ChampionMastery = new ChampionMasteryEndpoint(this.config, this.rateLimiter);
		this.Champion = new ChampionEndpoint(this.config, this.rateLimiter);
		this.League = new LeagueEndpoint(this.config, this.rateLimiter);
		this.Masteries = new MasteriesEndpoint(this.config, this.rateLimiter);
		this.Match = new MatchEndpoint(this.config, this.rateLimiter);
		this.Runes = new RunesEndpoint(this.config, this.rateLimiter);
		this.Spectator = new SpectatorEndpoint(this.config, this.rateLimiter);

		// An Endpoint that does not get passed the ratelimiter will not be rate-limited
		this.LolStatus = new LolStatusEndpoint(this.config);
		this.StaticData = new StaticDataEndpoint(this.config);

		/** Array to be able to replace cahes for all endpoints */
		this._endpoints = [
			this.Summoner,
			this.ChampionMastery,
			this.Champion,
			this.League,
			this.Masteries,
			this.Match,
			this.Runes,
			this.Spectator,

			this.LolStatus,
			this.StaticData
		];
	}

	/**
	 * Sets a new Cache type or options for all endpoints.
	 * Also available per endpoint
	 * @param options
	 * @param Constructor
	 */
	setCache(options, Constructor){
		this._endpoints.forEach(endpoint => {
			endpoint.setCache(options, Constructor);
		});
	}

	/**
	 * Flushes all caches for all endpoints.
	 * Also available per endpoint
	 */
	flushCache() {
		this._endpoints.forEach(endpoint => {
			endpoint.flushCache();
		});
	}


	/**
	 * Enables caching and can set a new Cache type or options for all endpoints.
	 * Also available per endpoint
	 * @param options
	 * @param Constructor
	 */
	enableCaching(options, Constructor){
		this._endpoints.forEach(endpoint => {
			endpoint.enableCaching(options, Constructor);
		});
	}

	/**
	 * Disables Caching for all endpoints.
	 * Also available per endpoint
	 */
	disableCaching(){
		this._endpoints.forEach(endpoint => {
			endpoint.disableCaching();
		});
	}
}

// Add the Comaptibility layer to the wrapper
// compatibility(LeagueJS); // TODO: add again if still neccessary

module.exports = LeagueJS;