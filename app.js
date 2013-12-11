leagueApi = require('./lolapi');

leagueApi.init('');

//These should all be undefined if you provide a valid key.

leagueApi.Champions(function(err, champs) {
	console.log(err);
});

leagueApi.League(19321078, function(err, data) {
	console.log(err);
});

leagueApi.Game(19321078, function(err, data) {
	console.log(err);
});

leagueApi.Stats.Ranked(19321078, function(err,data) {
	console.log(err);
});

leagueApi.Stats.Summary(19321078, function(err,data) {
	console.log(err);
});

leagueApi.Summoner.Masteries(19321078, function(err,data) {
	console.log(err);
});

leagueApi.Summoner.ListNames('19321078,62746', function(err,data) {
	console.log(err);
});

leagueApi.Team(19321078, function(err, data) {
	console.log(err);
});