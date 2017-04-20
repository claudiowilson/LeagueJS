let RequestCache = require ('./requestCache');

module.exports = {
  "API_KEY" : process.env.LEAGUE_API_KEY,
  "platform": process.env.LEAGUE_API_REGION,
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
    "api" : "api.riotgames.com/lol",

    "champions" : "/platform/v3/champions",
    "champion-mastery" : "/champion-mastery/v3/champion-masteries",
    "status": "/status/v3/shard-data",
    "masteries" : "/platform/v3/masteries",
    "runes" : "/platform/v3/runes",
    "spectator" : "/spectator/v3/",
    "static" : "/static-data/v3/",
    "summoner" : "/summoner/v3/summoners",
  }
}