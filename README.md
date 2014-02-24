LeagueJS
========

A Javascript Wrapper for the League of Legends API

## How To Use

Use npm to install it from the npm registry by running `npm install leagueapi`

Put the following in a `server.js` file.

```Javascript

var LolApi = require('leagueapi');

LolApi.init('XXXXXXXXXXXXXXX', 'euw');

LolApi.getChampions(true, function(err, champs) {
	champs.forEach(function(champ) {
		if(champ.freeToPlay) console.log(champ.name + ' is free to play!!');
	});
});

LolApi.Summoner.getByName('YOLO Swag 5ever', function(err, summoner) {
	if(!err) {
		console.log(summoner);
	}
})
```
Run `node server.js`

### Here's the list of methods and their parameters:
`[param]` means you can pass null if you don't want to specify this parameter


```Javascript
	LolApi.Init(ApiKey); //Will default to NA
	LolApi.Init(ApiKey, region);

	LolApi.setRateLimit(limitPer10s, limitPer10min);
	
	LolApi.getMapNames(callback);

	LolApi.getRegions(callback);

	LolApi.getQueues(callback);

	LolApi.getChampions([freeToPlay], region, callback);
	LolApi.getChampions([freeToPlay], callback);

	LolApi.getRecentGames(summonerId, region, callback);
	LolApi.getRecentGames(summonerId, callback);

	LolApi.getLeagueData(summonerId, region, callback);
	LolApi.getLeagueData(summonerId, callback);
	
	LolApi.getLeagueEntryData(summonerId, region, callback);
	LolApi.getLeagueEntryData(summonerId, callback);

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
	
Before submitting a pull request run the following command to run JSLint and BDD tests. Also pass it one of the given flags which will change the projects version number in the package.json:

- `gulp prod [--major, --minor, --patch]`
