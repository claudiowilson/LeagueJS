const Endpoint = require ('./endpoint');
const Request = require('../apiRequest');

const ParameterError = require('../errors/ParameterError');

/**
 * Summoner APIEndpoint
 */
class ChampionEndpoint extends Endpoint {
    
    /**
     * Retrieve all champions.
     * 
     * @param {bool} free Optional filter param to retrieve only free to play champions.
     * @param {*} options 
     */
    get(free, options = {}) {
        let query = (free !== undefined) ? 'free=' + free.toString() : '';

        let request = super.buildRequest(
            options,
            this.config.endpoints.champion,
            ''
        );

        return super.executeRequest(request);
    }

    /**
     * Retrieve champion by ID.
     * 
     * @param {string} id Champion ID
     * @param {object} options 
     */
    getById(id, options = {}) {
        if(id instanceof Array) {
            throw new ParameterError('Champion ID can not be an Array.');
        }

        let request = super.buildRequest(
            options,
            this.config.endpoints.champion,
            id
        );
    }
}

module.exports = ChampionEndpoint;