const Endpoint = require ('./endpoint');
const Request = require('../apiRequest');

/**
 * Summoner APIEndpoint
 */
class SummonerEndpoint extends Endpoint{

    /**
     * Return Summoner information by name
     */
    getByName(names, options = {}) {

        let region = (options.region) ? options.region : this.config.region;

        let request = new Request(
            Endpoint.buildURL(this.config.endpoints.api, region, this.config.endpoints.summoner + '/by-name', names, this.config.API_KEY)
        );
    
        return super.executeRequest(request);
    }
}

module.exports = SummonerEndpoint;