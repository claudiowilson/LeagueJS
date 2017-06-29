const Bluebird = require('bluebird');

const Endpoint = require('../Endpoint');

const util = require('../util');
const {ErrorUtil, SummonerUtil} = util;

/**
 * Endpoint to receive Summoner information
 */
class SummonerEndpoint extends Endpoint {

	constructor(config, rateLimiter) {
		super('Summoner', config, rateLimiter);
		this.apiUrl += `/summoner/${this.apiVersion}/summoners`;
	}

	/**
	 * Get the summoner by the given name
	 * @methodOf {SummonerEndpoint}
	 * @param {string} name
	 * @param {string} platformIdOrRegion
	 * @return {Bluebird<SummonerDto>}
	 */
	gettingByName(name, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => Bluebird.all([ErrorUtil.throwIfIsArray(name, 'name'), ErrorUtil.throwIfNameIsInvalid(name, 'name')]))
			.then(() => {
				let normalizedName = SummonerUtil.normalizeSummonerName(name);
				return this.executingRequest(`/by-name/${encodeURIComponent(normalizedName)}`, platformIdOrRegion);
			});
	}

	/**
	 * Get the summoner by the given riot account id
	 * @param accountId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<SummonerDto>}
	 */
	gettingByAccount(accountId, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(accountId, 'accountId'))
			.then(() => this.executingRequest(`/by-account/${accountId}`, platformIdOrRegion));
	}

	/**
	 *
	 * @param summonerId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<SummonerDto>}
	 */
	gettingById(summonerId, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(summonerId, 'summonerId'))
			.then(() => this.executingRequest(`/${summonerId}`, platformIdOrRegion));
	}
}

module.exports = SummonerEndpoint;