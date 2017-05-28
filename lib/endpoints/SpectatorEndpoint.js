const Endpoint = require ('../Endpoint');
const EndpointUtil = require('../EndpointUtil');

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
	 * @param platformId
	 * @return {Bluebird<CurrentGameInfo>}
	 */
	gettingActiveGame( summonerId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/active-games/by-summoner/${summonerId}`,  platformId);
	}

	/**
	 * Get list of featured games.
	 * @return {Bluebird<FeaturedGames>}
	 */
	gettingFeaturedGames(platformId = this.config.PLATFORM_ID){
		return this.executingRequest(`/featured-games`, platformId);
	}
}

module.exports = SpectatorEndpoint;