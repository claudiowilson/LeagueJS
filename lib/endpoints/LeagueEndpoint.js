const Bluebird = require('bluebird');

const Endpoint = require ('../Endpoint');

const util = require('../util');
const {ErrorUtil} = util;

/***
 * Endpoint to receive ranked information about leagues by queue or for specific summoners
 */
class LeagueEndpoint extends Endpoint {

	constructor(config, rateLimiter){
		super('League', config, rateLimiter);
		this.apiUrl += `/league/${this.apiVersion}`;
	}

	/**
	 * gets the Challenger league for the given ranked queue and platformIdOrRegion
	 * @param {'RANKED_SOLO_5x5' | 'RANKED_FLEX_TT' | 'RANKED_FLEX_SR' } rankedQueueConfigId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<LeagueListDTO>}
	 */
	gettingChallengerLeague( rankedQueueConfigId, platformIdOrRegion = this.config.PLATFORM_ID){
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfRankedQueueConfigIdInvalid(rankedQueueConfigId))
			.then(() => this.executingRequest(`/challengerleagues/by-queue/${rankedQueueConfigId}`, platformIdOrRegion));
	}

	/**
	 * gets the Master league for the given ranked queue and platformIdOrRegion
	 * @param {'RANKED_SOLO_5x5' | 'RANKED_FLEX_TT' | 'RANKED_FLEX_SR' } rankedQueueConfigId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<LeagueListDTO>}
	 */
	gettingMasterLeague( rankedQueueConfigId, platformIdOrRegion = this.config.PLATFORM_ID){
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfRankedQueueConfigIdInvalid(rankedQueueConfigId))
			.then(() => this.executingRequest(`/masterleagues/by-queue/${rankedQueueConfigId}`,  platformIdOrRegion));
	}

	/**
	 * gets all leagues the summoner is ranked in
	 * @return {Bluebird<LeagueListDTO[]>}
	 */
	gettingLeagueForSummonerId( summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId'))
			.then(() => this.executingRequest(`/leagues/by-summoner/${summonerId}`,  platformIdOrRegion));
	}

	/**
	 * gets information about the league positioning for the summoner in all queues he is ranked in
	 * @return {Bluebird<LeaguePositionDTO[]>}
	 */
	gettingPositionsForSummonerId( summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId'))
			.then(() => this.executingRequest(`/positions/by-summoner/${summonerId}`,  platformIdOrRegion));
	}

}

module.exports = LeagueEndpoint;