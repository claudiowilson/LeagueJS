leagueApi = require('./lolapi');

leagueApi.init('');

leagueApi.Champions(function(err, champs) {
	console.log(champs);
});