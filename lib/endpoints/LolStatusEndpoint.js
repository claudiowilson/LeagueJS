const Endpoint = require ('./Endpoint');
const EndpointUtil = require('./EndpointUtil');

// const ParameterError = require('../errors/ParameterError');

/***
 * Endpoint to receive Service information per region
 */
class LolStatusEndpoint extends Endpoint {

	constructor(config, platformIds){
		super('LolStatus', config, platformIds);
		this.apiUrl += `/status/${this.apiVersion}`;
	}

	/**
	 * gets status information about the shard of the given platformId
	 * RATE LIMIT NOTE: Requests to this API are not counted against the application Rate Limits.
	 * @param platformId
	 * @return {Bluebird<ShardStatus>}
	 */
	gettingShardData( platformId = this.config.PLATFORM_ID){
		return this.executingRequestWithoutRateLimit(`/shard-data`, platformId);
	}
}

module.exports = LolStatusEndpoint;