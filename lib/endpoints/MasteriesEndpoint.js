const Endpoint = require ('./Endpoint');
const EndpointUtil = require('./EndpointUtil');

/***
 * Endpoint to receive Masteries of a player
 */
class MasteriesEndpoint extends Endpoint {

	constructor(config, platformIds){
		super('Masteries', config, platformIds);
		this.apiUrl += `/platform/${this.apiVersion}`;
	}

	/**
	 * Gets the mastery pages for the given summoner
	 * @param summonerId
	 * @param platformId
	 * @return {Bluebird<MasteryPagesDto>}
	 */
	gettingBySummoner( summonerId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/masteries/by-summoner/${summonerId}`,  platformId);
	}
}

module.exports = MasteriesEndpoint;