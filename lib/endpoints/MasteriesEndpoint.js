const Endpoint = require ('../Endpoint');
const EndpointUtil = require('../EndpointUtil');

/***
 * Endpoint to receive Masteries of a player
 */
class MasteriesEndpoint extends Endpoint {

	constructor(config, rateLimiter){
		super('Masteries', config, rateLimiter);
		this.apiUrl += `/platform/${this.apiVersion}`;
	}

	/**
	 * Gets the mastery pages for the given summoner
	 * @param summonerId
	 * @param platformIdOrRegion
	 * @return {Bluebird<MasteryPagesDto>}
	 */
	gettingBySummoner( summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/masteries/by-summoner/${summonerId}`,  platformIdOrRegion);
	}
}

module.exports = MasteriesEndpoint;