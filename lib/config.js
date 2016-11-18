let RequestCache = require ('./requestCache');

module.exports = {
  "API_KEY" : process.env.LEAGUE_API_KEY,
  "region": process.env.LEAGUE_API_REGION,
  "caching": {
    "cache": RequestCache,
    "ttl": {
      "champion": 120
    }
  },
  "limits": {
    10: 10,
    600: 500
  },
  "endpoints" : {
    "api" : "euw.api.pvp.net/api/lol",
    "champion" : "/v1.2/champion",
    "summoner" : "/v1.4/summoner"
  }
}