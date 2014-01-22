/*global require*/
/*global exports*/
/*global console*/
'use strict';

var leagueApi = require('./lolapi');
leagueApi.init('605ed83e-ec74-43b7-9296-ac7160c174a1', 'na');

//All the errors should be null if you pass a valid key

leagueApi.getChampions(null, 'na', function (err, champs) {
    if (err) {
        console.log(err);
        return;
    }
    champs.forEach(function (champ) {
        if (champ.freeToPlay) {
            console.log(champ.name + ' is free to play!!');
        }
    });
});

/* Returns an error if player has no league data */
//leagueApi.getLeagueData(22097256, function (err, data) {
//    if (err) {
//        console.log(err);
//        return;
//    }
//    console.log(data);
//});

//leagueApi.getRecentGames(40500341, 'na', function (err, data) {
//    console.log(err);
//    console.log(data);
//});

//leagueApi.Stats.getPlayerSummary(40500341, null, function (err, data) {
//    console.log(err);
//    console.log(data);
//});

/*
 *
 * Returns an error if player hasn't played ranked.
 * And if player (pro player) has played ranked but has no ranked data? Reset by RIOT?
 */
//leagueApi.Stats.getRanked(19321078, null, function (err, data) {
//    console.log(err);
//    console.log(data);
//});

//leagueApi.Summoner.getRunes(40500341, function (err, data) {
//    console.log(data);
//});

//leagueApi.Summoner.getByName("EvLSnoopY", function (err, summoner) {
//    if (!err) {
//        console.log(summoner);
//    }
//});

//leagueApi.Summoner.getByID(19321078, function (err, summoner) {
//    if (!err) {
//        console.log(summoner);
//    }
//});

//leagueApi.Summoner.listNamesByIDs('19321078,62746', function (err, data) {
//    console.log(err);
//    console.log(data);
//});

//leagueApi.getTeams(19321078, function (err, data) {
//    console.log(err);
//    console.log(data);
//});

//leagueApi.getMapNames(function(err, regions) {
//    console.log(regions[2]);
//});