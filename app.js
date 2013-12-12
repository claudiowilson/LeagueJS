var leagueApi = require('./lolapi');
leagueApi.init('', 'na');

//These should all be null if you provide a valid key.

/*leagueApi.Champions(function(err, champs) {
	console.log(err);
	champs.forEach(function(champ) {
		console.log(champ.name);
	});
});*/

// leagueApi.League(19321078, 'na', function(err, data) {
// 	console.log(err);
// 	console.log(data);
// });

// leagueApi.Game(19321078, function(err, data) {
// 	console.log(err);
// 	console.log(data);
// });

// leagueApi.Stats.Ranked(19321078, function(err,data) {
// 	console.log(err);
// });

/*leagueApi.Stats.Ranked(19321078, 3, function(err,data) {
	console.log(err);
});*/

leagueApi.Summoner.Masteries(19321078, function(err,data) {
	console.log(data);
});

/*leagueApi.Summoner.ListNames('19321078,62746', function(err,data) {
	console.log(err);
	console.log(data);
});*/

// leagueApi.Team(19321078, function(err, data) {
// 	console.log(err);
// });