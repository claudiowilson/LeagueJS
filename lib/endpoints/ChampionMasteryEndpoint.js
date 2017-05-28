const Endpoint = require ('../Endpoint');
const EndpointUtil = require('../EndpointUtil');

/**
 * Endpoint to receive ChampionMastery information
 * */
class ChampionMasteryEndpoint extends Endpoint {

	constructor(config, rateLimiter){
		super('ChampionMastery', config, rateLimiter);
		this.apiUrl += `/champion-mastery/${this.apiVersion}`;
	}

	/**
	 * Gets all ChampionMastery Informations for the Summoner
	 * @param summonerId
	 * @param platformId
	 * @return {Bluebird<ChampionMasteryDTO[]>}
	 */
	gettingBySummoner(summonerId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/champion-masteries/by-summoner/${summonerId}`,  platformId);
	}

	/**
	 * Gets the ChampionMastery Information for the Summoner on the specified champion
	 * @param summonerId
	 * @param championId
	 * @param platformId
	 * @return {Bluebird<ChampionMasteryDTO>}
	 */
	gettingBySummonerForChampion(summonerId, championId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		EndpointUtil.throwIfNotNumerical(championId, 'championId');

		return this.executingRequest(`/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}`,  platformId);
	}

	/**
	 * Returns the ChampionMastery score (combined champion-levels for the summoner)
	 * @return {Bluebird<number>}*/
	gettingScoresBySummoner(summonerId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/scores/by-summoner/${summonerId}`,  platformId);
	}
}

module.exports = ChampionMasteryEndpoint;