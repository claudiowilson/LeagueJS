const Endpoint = require ('../Endpoint');
const ErrorUtil = require('../util/ErrorUtil');

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
		ErrorUtil.throwIfRankedQueueConfigIdInvalid(rankedQueueConfigId);
		return this.executingRequest(`/challengerleagues/by-queue/${rankedQueueConfigId}`, platformIdOrRegion);
	}

	/**
	 * gets the Master league for the given ranked queue and platformIdOrRegion
	 * @param {'RANKED_SOLO_5x5' | 'RANKED_FLEX_TT' | 'RANKED_FLEX_SR' } rankedQueueConfigId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<LeagueListDTO>}
	 */
	gettingMasterLeague( rankedQueueConfigId, platformIdOrRegion = this.config.PLATFORM_ID){
		ErrorUtil.throwIfRankedQueueConfigIdInvalid(rankedQueueConfigId);
		return this.executingRequest(`/masterleagues/by-queue/${rankedQueueConfigId}`,  platformIdOrRegion);
	}

	/**
	 * gets all leagues the summoner is ranked in
	 * @return {Bluebird<LeagueListDTO[]>}
	 */
	gettingLeagueForSummonerId( summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/leagues/by-summoner/${summonerId}`,  platformIdOrRegion);
	}

	/**
	 * gets information about the league positioning for the summoner in all queues he is ranked in
	 * @return {Bluebird<LeaguePositionDTO[]>}
	 */
	gettingPositionsForSummonerId( summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/positions/by-summoner/${summonerId}`,  platformIdOrRegion);
	}

}

module.exports = LeagueEndpoint;