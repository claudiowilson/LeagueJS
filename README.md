LeagueJS
========

A Javascript Wrapper for the League of Legends API

## How To Use
```Javascript
npm install leagueapi

var LolApi = require('leagueapi');

LolApi.init('XXXXXXXXXXXXXXX', 'euw');

LolApi.getChampions(true, 'euw', function(err, chamnps) {
	champs.forEach(function(champ) {
		if(champ.freeToPlay) console.log(champ.name + ' is free to play!!');
	});
});
```

Here's the list of methods and their parameters:
```Javascript


```
