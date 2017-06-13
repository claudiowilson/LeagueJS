const Bluebird = require('bluebird');

const Endpoint = require ('../Endpoint');

const util = require('../util');
const {ErrorUtil} = util;

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
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<MasteryPagesDto>}
	 */
	gettingBySummoner( summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId'))
			.then(() => this.executingRequest(`/masteries/by-summoner/${summonerId}`,  platformIdOrRegion));
	}
}

module.exports = MasteriesEndpoint;