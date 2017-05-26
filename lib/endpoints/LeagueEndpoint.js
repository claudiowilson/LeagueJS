const Endpoint = require ('./Endpoint');
const EndpointUtil = require('./EndpointUtil');

const ParameterError = require('../errors/ParameterError');

/***
 * Endpoint to receive ranked information about leagues by queue or for specific summoners
 */
class LeagueEndpoint extends Endpoint {

	constructor(config, platformIds){
		super('League', config, platformIds);
		this.apiUrl += `/league/${this.apiVersion}`;
	}

	/**
	 * gets the Challenger league for the given ranked queue and platformId
	 * @param {'RANKED_SOLO_5x5' | 'RANKED_FLEX_TT' | 'RANKED_FLEX_SR' } rankedQueueConfigId
	 * @param platformId
	 * @return {Promise<LeagueListDTO>}
	 */
	gettingChallengerLeague( rankedQueueConfigId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfRankedQueueConfigIdInvalid(rankedQueueConfigId);
		return this.executingRequest(`/challengerleagues/by-queue/${rankedQueueConfigId}`, platformId);
	}

	/**
	 * gets the Master league for the given ranked queue and platformId
	 * @param {'RANKED_SOLO_5x5' | 'RANKED_FLEX_TT' | 'RANKED_FLEX_SR' } rankedQueueConfigId
	 * @param platformId
	 * @return {Promise<LeagueListDTO>}
	 */
	gettingMasterLeague( rankedQueueConfigId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfRankedQueueConfigIdInvalid(rankedQueueConfigId);
		return this.executingRequest(`/masterleagues/by-queue/${rankedQueueConfigId}`,  platformId);
	}

	/**
	 * gets all leagues the summoner is ranked in
	 * @return {Promise<LeagueListDTO[]>}
	 */
	gettingLeagueForSummonerId( summonerId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/leagues/by-summoner/${summonerId}`,  platformId);
	}

	/**
	 * gets information about the league positioning for the summoner in all queues he is ranked in
	 * @return {Promise<LeaguePositionDTO[]>}
	 */
	gettingPositionsForSummonerId( summonerId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`positions/by-summoner/${summonerId}`,  platformId);
	}

}

module.exports = LeagueEndpoint;