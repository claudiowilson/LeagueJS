var LeagueJs = require ('../lib/league.js');

var api = new LeagueJs({
  region: 'euw'
});

api.summoner.getByName('EldoranDev').then(
  () => {},
  err => {
    console.log(err);
  }
)