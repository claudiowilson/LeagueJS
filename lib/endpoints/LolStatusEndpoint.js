const Endpoint = require ('../Endpoint');

/***
 * Endpoint to receive Service information per region
 */
class LolStatusEndpoint extends Endpoint {

	constructor(config){
		super('LolStatus', config);
		this.apiUrl += `/status/${this.apiVersion}`;
	}

	/**
	 * gets status information about the shard of the given platformId
	 * RATE LIMIT NOTE: Requests to this API are not counted against the application Rate Limits.
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ShardStatus>}
	 */
	gettingShardData( platformIdOrRegion = this.config.PLATFORM_ID){
		return this.executingRequest(`/shard-data`, platformIdOrRegion);
	}
}

module.exports = LolStatusEndpoint;