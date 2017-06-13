const Bluebird = require('bluebird');

const Endpoint = require ('../Endpoint');

const util = require('../util');
const {ErrorUtil} = util;

/***
 * Endpoint to receive live match information
 */
class SpectatorEndpoint extends Endpoint {

	constructor(config, rateLimiter){
		super('Spectator', config, rateLimiter);
		this.apiUrl += `/spectator/${this.apiVersion}`;
	}

	/**
	 * Get current game information for the given summoner ID.
	 * @param summonerId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<CurrentGameInfo>}
	 */
	gettingActiveGame( summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId'))
			.then(() => this.executingRequest(`/active-games/by-summoner/${summonerId}`,  platformIdOrRegion));
	}

	/**
	 * Get list of featured games.
	 * @return {Bluebird<FeaturedGames>}
	 */
	gettingFeaturedGames(platformIdOrRegion = this.config.PLATFORM_ID){
		return this.executingRequest(`/featured-games`, platformIdOrRegion);
	}
}

module.exports = SpectatorEndpoint;