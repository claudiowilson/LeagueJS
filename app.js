var leagueApi = require('./lolapi');
leagueApi.init('', 'na');

//All the errors should be null if you pass a valid key

// leagueApi.getChampions(null, 'euw' function(err, champs) {
// 	if(err) {console.log(err); return; }
// 	champs.forEach(function(champ) {
// 		if(champ.freeToPlay) console.log(champ.name + ' is free to play!!');
// 	});
// });

// leagueApi.getLeagueData(19321078, function(err, data) {
// 	if(err) {console.log(err); return; }
// 	console.log(data);
// });

// leagueApi.getRecentGames(19321078, 'na',  function(err, data) {
// 	console.log(err);
// 	console.log(data);
// });

// leagueApi.Stats.getPlayerSummary(19321078, null, function(err,data) {
// 	console.log(err);
// 	console.log(data);
// });

// leagueApi.Stats.getRanked(19321078, null, function(err,data) {
// 	console.log(err);
// 	console.log(data);
// });

// leagueApi.Summoner.getRunes(19321078, function(err,data) {
// 	console.log(data);
// });

// leagueApi.Summoner.getByName("YOLO Swag 5ever", function(err,summoner) {
// 	if(!err) {
// 		console.log(summoner);
// 	}
// });

// leagueApi.Summoner.getByID(19321078, function(err,summoner) {
// 	if(!err) {
// 		console.log(summoner);
// 	}
// });

// leagueApi.Summoner.listNamesByIDs('19321078,62746', function(err,data) {
// 	console.log(err);
// 	console.log(data);
// });

// leagueApi.getTeams(19321078, function(err, data) {
// 	console.log(err);
// 	console.log(data);
// });
leagueApi.getMapNames(function(err, regions) {
	console.log(regions[2]);
});