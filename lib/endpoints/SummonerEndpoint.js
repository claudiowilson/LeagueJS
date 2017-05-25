const Endpoint = require ('./Endpoint');
const EndpointUtil = require('./EndpointUtil');
const LeagueUtil = require('../LeagueUtil');

/**
 * Summoner APIEndpoint
 */
class SummonerEndpoint extends Endpoint {

    constructor(config, platformIds){
        super('Summoner', config, platformIds);
        this.apiUrl += `/summoner/${this.apiVersion}/summoners`;
	}

    /**
     * Get the summoner by the given name
     * @methodOf {SummonerEndpoint}
     * @param {string} name 
     * @param {string} platformId
	 * @return {Promise<SummonerDTO>}
     */
    gettingByName(name, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfParamIsArray(name, 'name');
		EndpointUtil.throwIfNameIsInvalid(name, 'name');

		let normalizedName = LeagueUtil.normalizeSummonerName(name);
        return this.executingRequest(`/by-name/${normalizedName}`,  platformId);
    }

    /**
     * Get the summoner by the given riot account id
     * @param accountId
     * @param platformId
	 * @return {Promise<SummonerDTO>}
	 */
    gettingByAccount(accountId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(accountId, 'accountId');
		return this.executingRequest(`/by-account/${accountId}`,  platformId);
	}

    /**
     *
     * @param summonerId
     * @param platformId
	 * @return {Promise<SummonerDTO>}
	 */
    gettingById(summonerId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/${summonerId}`,  platformId);
	}
}

module.exports = SummonerEndpoint;