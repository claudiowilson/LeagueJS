LeagueJS
========

A Javascript Wrapper for the League of Legends API

## How To Use

Use npm to install it from the npm registry by running `npm install leagueapi`

Put the following in a `server.js` file.

```Javascript

var LolApi = require('leagueapi');

LolApi.init('XXXXXXXXXXXXXXX', 'euw');

LolApi.getChampions(true, function(err, chamnps) {
	champs.forEach(function(champ) {
		if(champ.freeToPlay) console.log(champ.name + ' is free to play!!');
	});
});
```
Run `node server.js`

### Here's the list of methods and their parameters:
`[param]` means you can pass null if you don't want to specify this parameter


```Javascript
	LolApi.Init(ApiKey); //Will default to NA
	LolApi.Init(ApiKey, region);

	LolApi.getChampions([freeToPlay], region, callback);
	LolApi.getChampions([freeToPlay], callback);

	LolApi.getRecentGames(summonerId, region, callback);
	LolApi.getRecentGames(summonerId, callback);

	LolApi.getLeagueData(summonerId, region, callback);
	LolApi.getLeagueData(summonerId, callback);

	LolApi.getTeams(summonerId, region, callback);
	LolApi.getTeams(summonerId, callback);


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

```
