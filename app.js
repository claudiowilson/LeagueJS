var leagueApi = require('./lolapi');
leagueApi.init('', 'na');

//These should all be null if you provide a valid key.

/*leagueApi.getChampions(function(err, champs) {
	console.log(err);
	champs.forEach(function(champ) {
		console.log(champ.name);
	});
});*/

// leagueApi.getLeagueData(19321078, 'na', function(err, data) {
// 	console.log(err);
// 	console.log(data);
// });

// leagueApi.getRecentGames(19321078, function(err, data) {
// 	console.log(err);
// 	console.log(data);
// });

// leagueApi.Stats.getPlayerSummary(19321078, function(err,data) {
// 	console.log(err);
// });

/*leagueApi.Stats.getRankedStats(19321078, 3, function(err,data) {
	console.log(err);
});*/

leagueApi.Summoner.getMasteries(19321078, function(err,data) {
	console.log(data);
});

/*leagueApi.Summoner.listNamesByIDs('19321078,62746', function(err,data) {
	console.log(err);
	console.log(data);
});*/

// leagueApi.getTeams(19321078, function(err, data) {
// 	console.log(err);
// });