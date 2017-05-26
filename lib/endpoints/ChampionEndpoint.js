const Endpoint = require ('./Endpoint');
const EndpointUtil = require('./EndpointUtil');

/***
 * Endpoint to receive client information about champions on the league platform
 * For game data about champions use static-data instead
 */
class ChampionEndpoint extends Endpoint {

	constructor(config, platformIds){
		super('Champion', config, platformIds);
		this.apiUrl += `/platform/${this.apiVersion}/champions`;
	}

	/**
	 * Gets basic platform information about all champions.
	 * @param freeToPlay
	 * @param platformId
	 * @return {Bluebird<ChampionListDto>}
	 */
	gettingList( {freeToPlay = false} = {}, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotBoolean(freeToPlay, 'freeToPlay');
		return this.executingRequest(``,  platformId, EndpointUtil.buildQueryStringFromOptions({freeToPlay}));
	}

	/**
	 * Gets the basic platform information about a specific champion
	 * @param championId
	 * @param platformId
	 * @return {Bluebird<ChampionDto>}
	 */
	gettingById(championId, platformId = this.config.PLATFORM_ID){
		EndpointUtil.throwIfNotNumerical(championId, 'championId');

		return this.executingRequest(`/${championId}`, platformId);
	}
}

module.exports = ChampionEndpoint;