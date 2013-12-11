leagueApi = require('./lolapi');

leagueApi.init('');

// leagueApi.Champions(function(err, champs) {
// 	console.log(champs);
// });

// leagueApi.League(19321078, function(err, data) {
// 	console.log(data);
// });

// leagueApi.Game(19321078, function(err, data) {
// 	console.log(data);
// });

// leagueApi.Stats.Ranked(19321078, function(err,data) {
// 	console.log(data);
// });

// leagueApi.Stats.Summary(19321078, function(err,data) {
// 	console.log(data);
// });

/*leagueApi.Summoner.Masteries(19321078, function(err,data) {
	console.log(data);
});*/

leagueApi.Summoner.ByName("Yolo Swag 5ever", function(err,data) {
	console.log(data);
});


