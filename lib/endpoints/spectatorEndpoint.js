const Endpoint = require ('./endpoint');
const Request = require('../apiRequest');

const ParameterError = require('../errors/ParameterError');

/**
 * Summoner APIEndpoint
 */
class SpectatorEndpoint extends Endpoint {
    
    /**
     * Get current game information for the given summoner ID
     * 
     * @param {string} id 
     * @param {object} options 
     */
    getActiveGame(id, options = {}) {
        let request = super.buildRequest(
            options,
            this.config.endpoints.spectator + '/active-games/by-summoner',
            id
        );

        return super.executeRequest(request);
    }

    /**
     * Get list of featured games.
     * 
     * @param {object} options 
     */
    getFeaturedGames(options = {}) {
        let request = super.buildRequest(
            options,
            this.config.endpoints.spectator + '/featured-games',
            ''
        );
        
        return super.executeRequest(request);
    }
}

module.exports = SpectatorEndpoint;