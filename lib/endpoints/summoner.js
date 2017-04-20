const Endpoint = require ('./endpoint');
const Request = require('../apiRequest');

const ParameterError = require('../errors/ParameterError');

/**
 * Summoner APIEndpoint
 */
class SummonerEndpoint extends Endpoint{

    /**
     * Get the summoner by the given name
     * 
     * @param {string} name 
     * @param {object} options 
     */
    getByName(name, options = {}) {
        
        if(name instanceof Array) {
            throw new ParameterError('Name can not be an Array.');
        }

        let request = new Request(
            Endpoint.buildURL(this.config.endpoints.api, super.getPlatform(options), this.config.endpoints.summoner + '/by-name', name, this.config.API_KEY)
        );
    
        return super.executeRequest(request);
    }

    /**
     * Get the summoner by the given riot account id
     * @param {string} account 
     * @param {object} options 
     */
    getByAccount(account, options = {}) {
        if(account instanceof Array) {
            throw new ParameterError('Account can not be an Array.');
        }

        let request = new Requeste(
            Endpoint.buildURL(this.config.endpoints.api, super.getPlatform(options), this.config.endpoints.summoner + '/by-account', account, this.config.API_KEY)
        );

        return super.executeRequest(request);
    }

    /**
     * 
     * @param {string} id 
     * @param {object} options 
     */
    get(id, options = {}) {
        if(id instanceof Array) {
            throw new ParameterError('Summoner ID can not be an Array.');
        }

        let request = new Request(
             Endpoint.buildURL(this.config.endpoints.api, super.getPlatform(options), this.config.endpoints.summoner, account, this.config.API_KEY)
        );

        return super.executeRequest(request);
    }
}

module.exports = SummonerEndpoint;