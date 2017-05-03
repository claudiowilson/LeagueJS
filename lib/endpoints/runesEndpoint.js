const Endpoint = require ('./endpoint');
const Request = require('../apiRequest');

const ParameterError = require('../errors/ParameterError');

/**
 * Summoner APIEndpoint
 */
class RunesEndpoint extends Endpoint {
    
    /**
     * Get rune pages for a given summoner ID
     * 
     * @param {string} id 
     * @param {object} options 
     */
    getBySummoner(id, options = {}) {
        if(id instanceof Array) {
            throw new ParameterError('Summoner id must not be an array');
        }

        let request = super.buildRequest(
            options,
            this.config.endpoints.runes + '/by-summoner',
            id
        );

        return super.executeRequest(request);
    }
}

module.exports = RunesEndpoint;