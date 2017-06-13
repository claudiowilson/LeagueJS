const Endpoint = require ('../Endpoint');
const EndpointUtil = require('../util/EndpointUtil');

/***
 * Endpoint to receive Masteries of a player
 */
class RunesEndpoint extends Endpoint {

	constructor(config, rateLimiter){
		super('Runes', config, rateLimiter);
		this.apiUrl += `/platform/${this.apiVersion}`;
	}

	/**
	 * Get rune pages for a given summoner ID
	 * @param summonerId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<RunePagesDto>}
	 */
	gettingBySummoner( summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/runes/by-summoner/${summonerId}`,  platformIdOrRegion);
	}
}

module.exports = RunesEndpoint;