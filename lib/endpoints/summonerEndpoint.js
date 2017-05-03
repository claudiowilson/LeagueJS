const Endpoint = require ('./endpoint');
const Request = require('../apiRequest');

const ParameterError = require('../errors/ParameterError');

/**
 * Summoner APIEndpoint
 */
class SummonerEndpoint extends Endpoint {

    /**
     * Get a summoner by summoner name
     * 
     * @param {string} name 
     * @param {object} options 
     */
    getByName(name, options = {}) {
        
        if(name instanceof Array) {
            throw new ParameterError('Name must not be an Array.');
        }

        let request = super.buildRequest(
            options, 
            this.config.endpoints.summoner + '/by-name', 
            name
        );
    
        return super.executeRequest(request);
    }

    /**
     * Get a summoner by account id
     * 
     * @param {string} account 
     * @param {object} options 
     */
    getByAccount(account, options = {}) {
        if(account instanceof Array) {
            throw new ParameterError('Account must not be an Array.');
        }

        let request = super.buildRequest(
            options, 
            this.config.endpoints.summoner + '/by-account', 
            account
        );

        return super.executeRequest(request);
    }

    /**
     * Get a summoner by summoner id
     * 
     * @param {string} id 
     * @param {object} options 
     */
    get(id, options = {}) {
        if(id instanceof Array) {
            throw new ParameterError('Summoner ID must not be an Array.');
        }

        let request = super.buildRequest(
            options, 
            this.config.endpoints.summoner,
            id
        );

        return super.executeRequest(request);
    }
}

module.exports = SummonerEndpoint;