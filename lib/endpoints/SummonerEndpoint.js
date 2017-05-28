const Endpoint = require ('../Endpoint');
const EndpointUtil = require('../EndpointUtil');
const LeagueUtil = require('../LeagueUtil');

/**
 * Endpoint to receive Summoner information
 */
class SummonerEndpoint extends Endpoint {

    constructor(config, rateLimiter){
        super('Summoner', config, rateLimiter);
        this.apiUrl += `/summoner/${this.apiVersion}/summoners`;
	}

    /**
     * Get the summoner by the given name
     * @methodOf {SummonerEndpoint}
     * @param {string} name 
     * @param {string} platformId
	 * @return {Bluebird<SummonerDto>}
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
	 * @return {Bluebird<SummonerDto>}
	 */
    gettingByAccount(accountId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(accountId, 'accountId');
		return this.executingRequest(`/by-account/${accountId}`,  platformId);
	}

    /**
     *
     * @param summonerId
     * @param platformId
	 * @return {Bluebird<SummonerDto>}
	 */
    gettingById(summonerId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(summonerId, 'summonerId');
		return this.executingRequest(`/${summonerId}`,  platformId);
	}
}

module.exports = SummonerEndpoint;