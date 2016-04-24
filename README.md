LeagueJS
========

A Javascript Wrapper for the League of Legends API

## How To Use

Use npm to install it from the npm registry by running `npm install leagueapi`

Put the following in a `server.js` file.

```Javascript

var LolApi = require('leagueapi');

LolApi.init('XXXXXXXXXXXXXXX', 'na');

LolApi.getChampions(true, function(err, champs) {
    console.log(champs);
});

LolApi.Summoner.getByName('YOLO Swag 5ever', function(err, summoner) {
	if(!err) {
		console.log(summoner);
	}
})

//The wrapper also accepts promises:
LolApi.Summoner.getByName('YOLO Swag 5ever')
.then(function (summoner) {
    console.log(summoner);
});
```
Run `npm install` followed by `node server.js`

### Here's the list of methods and their parameters:
`[param]` means you can pass null if you don't want to specify this parameter


```Javascript
	LolApi.Init(ApiKey); //Will default to NA
	LolApi.Init(ApiKey, region);

	LolApi.setRateLimit(limitPer10s, limitPer10min);

	LolApi.setEndpoint(newEndpoint);
	LolApi.getEndpoint();
	
	LolApi.getMapNames(callback);

	LolApi.getRegions(callback);

	LolApi.getPlatformId(region, callback);

	LolApi.getQueues(callback);

	LolApi.getChampions([freeToPlay], region, callback);
	LolApi.getChampions([freeToPlay], callback);

	LolApi.getRecentGames(summonerId, region, callback);
	LolApi.getRecentGames(summonerId, callback);

	LolApi.getLeagueData(summonerId, region, callback);
	LolApi.getLeagueData(summonerId, callback);
	
	LolApi.getTeamLeagueData(teamId, region, callback); // Get LeagueData for given Team ID in given region
	LolApi.getTeamLeagueData(teamId, callback); // Get LeagueData for given Team ID
	
	LolApi.getLeagueEntryData(summonerId, region, callback);
	LolApi.getLeagueEntryData(summonerId, callback);

    LolApi.getTeamLeagueEntryData(teamId, region, callback); // Get LeagueData Entry for given Team ID in given region
	LolApi.getTeamLeagueEntryData(teamId, callback); // Get LeagueData Entry for given Team ID

    LolApi.getTeams(summonerId, region, callback);
    LolApi.getTeams(summonerId, callback);

    LolApi.getTeam(teamId, region, callback);
    LolApi.getTeam(teamId, callback);

	LolApi.getShards(callback);
	LolApi.getShardByRegion(callback);

	LolApi.getMatch(matchId, [includeTimeline], region, callback);

	options = {championIds: [1,3,4], rankedQueues: ['RANKED_SOLO_5x5', 'RANKED_TEAM_3x3', 'RANKED_TEAM_5x5'], beginIndex: 1, endIndex: 5};
	LolApi.getMatchHistory(summonerId, [options], region, callback);

	LolApi.getCurrentGame(summonerId, region, callback);

	LolApi.getFeaturedGames(region, callback);

	LolApi.Stats.getPlayerSummary(summonerId, [season], region, callback);
	LolApi.Stats.getPlayerSummary(summonerId, [season], callback);

	LolApi.Stats.getRanked(summonerId, [season], region, callback);
	LolApi.Stats.getRanked(summonerId, [season], callback);

	LolApi.Summoner.getMasteries(summonerId, region, callback);
	LolApi.Summoner.getMasteries(summonerId, callback);

	LolApi.Summoner.getRunes(summonerId, region, callback);
	LolApi.Summoner.getRunes(summonerId, callback);

	LolApi.Summoner.getByID(summonerId, region, callback);
	LolApi.Summoner.getByID(summonerId, callback);

	LolApi.Summoner.getByName(name, region, callback);
	LolApi.Summoner.getByName(name, callback);

	LoLApi.Summoner.listNamesByIDs(ids, region, callback);
	LolApi.Summoner.listNamesByIDs(ids, callback);

	options = {champData: 'allytips,blurb', version : '4.4.3', locale: 'en_US', dataById=true}
	//doesn't show all options
	LolApi.Static.getChampionList(options, region, callback);
	LolApi.Static.getChampionList(options, callback);
	
	options = {champData: 'allytips,blurb', version : '4.4.3', locale: 'en_US', dataById=true}
	//doesn't show all options
	LolApi.Static.getChampionById(champId, options, region, callback);
	LolApi.Static.getChampionById(champId, options, callback);
	
	options = {itemData: 'consumed'}
	//doesn't show all possible options
	LolApi.Static.getItemById(itemId, options, region, callback);
	LolApi.Static.getItemById(itemId, options, callback);
	
	options = {itemListData: 'consumed'}
	LolApi.Static.getItemList(options, region, callback);
	LolApi.Static.getItemList(options, callback);

	LolApi.Static.getMasteryList(options, region, callback);
	LolApi.Static.getMasteryList(options, callback);

	LolApi.Static.getMasteryById(options, region, callback);
	LolApi.Static.getMasteryById(options, callback);

	LolApi.Static.getRealm(region, callback);
	LolApi.Static.getRealm(callback);

	LolApi.Static.getRuneList(options, region, callback);
	LolApi.Static.getRuneById(id, options, callback);

	LolApi.Static.getSummonerSpellList(options, region, callback);
	LolApi.Static.getSummonerSpellById(id, options, callback);

	LolApi.ChampionMastery.getChampions(playerId, region, callback);
	LolApi.ChampionMastery.getChampions(playerId, callback);

	LolApi.ChampionMastery.getChampion(playerId, championId, region, callback);
	LolApi.ChampionMastery.getChampion(playerId, championId, callback);

	LolApi.ChampionMastery.getScore(playerId, region, callback);
	LolApi.ChampionMastery.getScore(playerId, callback);

	LolApi.ChampionMastery.getTopChampions(playerId, count, region, callback);
	LolApi.ChampionMastery.getTopChampions(playerId, count, callback);


    //The following methods are only for enabled tournament api keys:

    LolApi.getMatchForTournament(matchId, tournamentCode, [includeTimeline], region, callback);
    LolApi.getMatchForTournament(matchId, tournamentCode, [includeTimeline], callback);

    LolApi.getMatchIdsByTournament(tournamentCode, region, callback);
    LolApi.getMatchIdsByTournament(tournamentCode, callback);

    LolApi.Tournament.createProvider(region, callbackUrl, callback);

    LolApi.Tournament.createTournament(name, providerId, callback);

    LolApi.Tournament.createCode(tournamentId, count, options, callback);
    LolApi.Tournament.updateCode(tournamentCode, options, callback);
    LolApi.Tournament.getCode(tournamentCode, callback);

    LolApi.Tournament.getLobbyEventsByCode(tournamentCode, callback);
```

## LeagueJS Gulp Commands

Gulp.js is a streaming build system. Thanks to it's simplicity and code-over-configuration
we are able to create a simple, efficient and more intuitive build process.

### To get started you need to install Gulp.js globally:
- `npm install -g gulp`

#### Available gulp commands and their descriptions:

Run JSLint on all js files: 

- `gulp lint`
	
Run BDD tests:

- `gulp test`
	
Run istabul to generate a code coverage report:

- `gulp test-coverage`
	
Run plato to generate a code analysis report:

- `gulp code-report`
	
Runs both istanbul and plato in with one command:

- `gulp reports`
	
Removes both coverage and report directories created by istanbul and plato

- `gulp clean-reports`
	
Sets up a development environment that will watch for code changes then run JSLint and BDD tests upon saving:

- `gulp dev`
