const Endpoint = require ('./Endpoint');
const EndpointUtil = require('./EndpointUtil');
const LeagueUtil = require('../LeagueUtil');

/**
 * Summoner APIEndpoint
 */
class SummonerEndpoint extends Endpoint {

    constructor(config, platformIds){
        super(config, platformIds);
        this.apiUrl += `/summoner/${this.apiVersion}/summoners`;
	}

    /**
     * Get the summoner by the given name
     * 
     * @param {string} name 
     * @param {string} platformId
     */
    getByName(name, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfParamIsArray(name, 'name');
		EndpointUtil.throwIfNameIsInvalid(name);

		let normalizedName = LeagueUtil.normalizeSummonerName(name);
        return this.executingRequest(`/by-name/${normalizedName}`,  platformId);
    }

    /**
     * Get the summoner by the given riot account id
     * @param accountId
     * @param platformId
     */
    getByAccount(accountId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfParamIsArray(accountId, 'accountId');
		return this.executingRequest(`/by-account/${accountId}`,  platformId);
	}

    /**
     *
     * @param summonerId
     * @param platformId
     */
    getById(summonerId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfParamIsArray(summonerId, 'summonerId');
		return this.executingRequest(`/${summonerId}`,  platformId);
	}
}

module.exports = SummonerEndpoint;