const Endpoint = require ('../Endpoint');
const EndpointUtil = require('../EndpointUtil');
const LeagueUtil = require('../LeagueUtil');

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
	 * @param platformIdOrRegion
	 * @return {Bluebird<ChampionMasteryDTO[]>}
	 */
	gettingBySummoner(summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/champion-masteries/by-summoner/${summonerId}`,  platformIdOrRegion);
	}

	/**
	 * Gets the ChampionMastery Information for the Summoner on the specified champion
	 * @param summonerId
	 * @param championId
	 * @param platformIdOrRegion
	 * @return {Bluebird<ChampionMasteryDTO>}
	 */
	gettingBySummonerForChampion(summonerId, championId, platformIdOrRegion = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		EndpointUtil.throwIfNotNumerical(championId, 'championId');
		return this.executingRequest(`/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}`,  platformIdOrRegion);
	}

	/**
	 * Returns the ChampionMastery score (combined champion-levels for the summoner)
	 * @return {Bluebird<number>}*/
	gettingScoresBySummoner(summonerId, platformIdOrRegion = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/scores/by-summoner/${summonerId}`,  platformIdOrRegion);
	}
}

module.exports = ChampionMasteryEndpoint;