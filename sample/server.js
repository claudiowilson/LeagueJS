var LeagueJs = require ('../lib/leaguejs.js');

var api = new LeagueJs({
  platform: 'euw1'
});

api.specator.getFeaturedGames().then(
  data => {
    console.log(JSON.stringify(data))
  },
  err => {
    console.log(err);
  }
);