var LeagueJs = require ('../lib/LeagueJS.js');

var api = new LeagueJs({
  platform: 'euw1',
});

api.summoner.getByName('EldoranDev').then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);