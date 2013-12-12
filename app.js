var leagueApi = require('./lolapi');
leagueApi.init('', 'na');

//These should all be null if you provide a valid key.

leagueApi.getChampions(null, function(err, champs) {
	if(err) console.log(err); return;
	champs.forEach(function(champ) {
		if(champ.freeToPlay) console.log(champ.name + ' is free to play!!');
	});
});

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

/*leagueApi.Stats.getRanked(19321078, 3, function(err,data) {
	console.log(err);
});*/

/*leagueApi.Summoner.getMasteries(19321078, function(err,data) {
	console.log(data);
});*/

/*leagueApi.Summoner.listNamesByIDs('19321078,62746', function(err,data) {
	console.log(err);
	console.log(data);
});*/

// leagueApi.getTeams(19321078, function(err, data) {
// 	console.log(err);
// });