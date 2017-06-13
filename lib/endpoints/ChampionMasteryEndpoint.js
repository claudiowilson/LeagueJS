const Bluebird = require('bluebird');

const Endpoint = require('../Endpoint');

const util = require('../util');
const {ErrorUtil} = util;

/**
 * Endpoint to receive ChampionMastery information
 * */
class ChampionMasteryEndpoint extends Endpoint {

	constructor(config, rateLimiter) {
		super('ChampionMastery', config, rateLimiter);
		this.apiUrl += `/champion-mastery/${this.apiVersion}`;
	}

	/**
	 * Gets all ChampionMastery Informations for the Summoner
	 * @param summonerId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ChampionMasteryDTO[]>}
	 */
	gettingBySummoner(summonerId, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId'))
			.then(() => this.executingRequest(`/champion-masteries/by-summoner/${summonerId}`, platformIdOrRegion));
	}

	/**
	 * Gets the ChampionMastery Information for the Summoner on the specified champion
	 * @param summonerId
	 * @param championId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ChampionMasteryDTO>}
	 */
	gettingBySummonerForChampion(summonerId, championId, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => Bluebird.all([ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId'), ErrorUtil.throwIfNotNumerical(championId, 'championId')]))
			.then(() => this.executingRequest(`/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}`, platformIdOrRegion));
	}

	/**
	 * Returns the ChampionMastery score (combined champion-levels for the summoner)
	 * @return {Bluebird<number>}*/
	gettingScoresBySummoner(summonerId, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId'))
			.then(() => this.executingRequest(`/scores/by-summoner/${summonerId}`, platformIdOrRegion));
	}
}

module.exports = ChampionMasteryEndpoint;