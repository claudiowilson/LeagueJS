const Endpoint = require ('./endpoint');
const Request = require('../apiRequest');

const ParameterError = require('../errors/ParameterError');

/**
 * Summoner APIEndpoint
 */
class ChampionMasterieEndpoint extends Endpoint {

    /**
     * Get a player's total champion mastery score, 
     * which is sum of individual champion mastery level
     * 
     * @param {string} id 
     * @param {object} options 
     */
    getScoreBySummoner(id, options = {}) {
        //TODO: Implement
    }

    /**
     * Get all champion mastery entries sorted by number of champion points descending
     * 
     * @param {string} id 
     * @param {object} options 
     */
    getBySummoner(id, options = {}) {
        //TODO: Implement
    }

    /**
     * Get a champion mastery by player id and champion id.
     * 
     * @param {string} player 
     * @param {string} champion 
     * @param {object} options 
     */
    getForChampionBySummoner(player, champion, options = {}) {
        //TODO: Implement
    }
}

module.exports = ChampionMasterieEndpoint;