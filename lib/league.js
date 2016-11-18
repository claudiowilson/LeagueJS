'use strict'

const conf = require('./config');
const Request = require('./apiRequest');
const rate = require('./rateInfo');

// Endpoints

const SummonerEndpoint = require('./endpoints/summoner');

/**
 * Main Class for the API Wrapper
 */
class LeagueJS {

  /**
   * Create ApiWrapper and require API_KEY to be set
   */
  constructor(options = {}) {
    this.config = {};    
    
    Object.assign(this.config, conf, options);

    if(this.config.API_KEY == undefined || this.config.API_KEY == '') {
      throw new Error("The API_KEY is needed.");
    }

    Request.cache = new conf.caching.cache(this.config);
    rate.setLimits = this.config.limits;

    this.summoner = new SummonerEndpoint(this.config);
  }
}

module.exports = LeagueJS;