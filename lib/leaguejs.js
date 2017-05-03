'use strict'

const conf = require('./config');
const Request = require('./apiRequest');
const rate = require('./rateInfo');

const compatibility = require('./compatibility');

// Endpoints

const SummonerEndpoint = require('./endpoints/summonerEndpoint');
const ChampionEndpoint = require('./endpoints/championEndpoint');
const MasteriesEndpoint = require('./endpoints/masteriesEndpoint');
const RunesEndpoint = require('./endpoints/runesEndpoint');
const SpectatorEndpoint = require('./endpoints/spectatorEndpoint');

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

    this.summoner   = new SummonerEndpoint(this.config);
    this.champion   = new ChampionEndpoint(this.config);
    this.masteries  = new MasteriesEndpoint(this.config);
    this.runes      = new RunesEndpoint(this.config);
    this.specator   = new SpectatorEndpoint(this.config);
  }
}

// Add the Comaptibility layer to the wrapper
compatibility(LeagueJS);

module.exports = LeagueJS;