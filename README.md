LeagueJS
========

[![Join the chat at https://gitter.im/League-JS/Lobby](https://badges.gitter.im/League-JS/Lobby.svg)](https://gitter.im/League-JS/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A Javascript Wrapper for the League of Legends API.

## How To Use
// TODO: rework this doc-part
Use npm to install it from the npm registry by running `npm install leagueapi`

```
Run `npm install` followed by `node server.js`
```

### Quickstart

```
// setting default platformId to be used if you don't specify it on the endpoint method
process.env.LEAGUE_API_PLATFORM_ID = 'euw1'

const LeagueJs = require('../lib/LeagueJS.js');
const api = new LeagueJs(process.env.LEAGUE_API_KEY);

api.Summoner
	.gettingByName('EldoranDev')
	.then(data => {
		'use strict';
		console.log(data);
	})
	.catch(err => {
		'use strict';
		console.log(err);
	});

api.Summoner
	.gettingByAccount(22177292, 'euw')
	.then(data => {
		'use strict';
		console.log(data);
	})
	.catch(err => {
		'use strict';
		console.log(err);
	});
```

### Environment Variables

*LEAGUE_API_PLATFORM_ID* The value of this environmental variable will be used as default platformId. If not provided, 'na1' is used.

Alternatively they can be provided to the League constructor within the options parameter
```
const leagueApi = new League(<Your Api key>, {PLATFORM_ID: <default api region>})
```

We recommend you read the API key from your environment variables too and pass that to the LeagueJS constructor

```
const leagueApi = new League(process.env.LEAGUE_API_KEY)
```

### Caching

By default, caching is disabled.

If enabled, the default caching is using node-cache with the request-urls as caching-key
The easiest way to setup caching is to pass a minimum set of caching options to LeagueJS on instantiation

```
const leagueJS = new LeagueJS({
	...
	caching: {
			isEnabled: true, // enable basic caching
			defaults: {stdTTL: 120} // add a TTL to all Endpoints you think is appropriate (you can tune it later per Endpoint)
		}
	...
})
```

You can setup caching globally or on an Endpoint basis
```
// replacing Cache-options within Summoner endpoint (overwrites global options for that Endpoint)
leagueJS.Summoner.setCache({ stdTTL: 120})

leagueJS.Summoner.enableCaching();
leagueJS.Summoner.disableCaching();

// Set caching options for all endpoints (overwrites previously set options)
leagueJS.setCache({ stdTTL: 120}, MyCache)
leagueJS.setCache({ stdTTL: 120})
leagueJS.enableCaching();
leagueJS.disableCaching();
```

Options not explicitly set use following defaults (found in ```/lib/Config.js```)
```
{
	/** the standard ttl as number in seconds for every generated cache element.
	 * (default: 0)
	 * */
	stdTTL: 0,

	/**
	 * The period in seconds, as a number, used for the automatic delete check interval.
	 * 0 = no periodic check.
	 * (default: 600)
	 */
	checkperiod: 600,

	/**
	 * en/disable throwing or passing an error to the callback if attempting to .get a missing or expired value.
	 * (default: false)
	 */
	errorOnMissing: false,

	/**
	 * en/disable cloning of variables. If true you'll get a copy of the cached variable.
	 * If false you'll save and get just the reference.
	 * Note: true is recommended, because it'll behave like a server-based caching.
	 * You should set false if you want to save mutable objects or other complex types
	 * with mutability involved and wanted.
	 */
	useClones: true
}

```

You can set your own Caching implementation if you like
**NOTE: make sure the public interface of your caching implementation is the same as node-cache uses to prevent incompatibilities.**

```
const MyCache = require('myCache')

// replacing Cache during instantiation (for all endpoints)
const leagueJS = new LeagueJS({
	...
	caching: {
			isEnabled: true, // enable caching
			constructor: MyCache, // set a custom Caching implementation
		},
	...
	})


// replacing Cache globally (overwrites previously set options on endpoints)
leagueJS.setCache({ stdTTL: 120}, MyCache)

// replacing Cache within specific endpoint (overwrites global options for that Endpoint)
leagueJS.Summoner.setCache({ stdTTL: 120}, MyCache)
```

# Developer

## LeagueJS Gulp Commands
// TODO: propably rework this doc-part

Gulp.js is a streaming build system. Thanks to it's simplicity and code-over-configuration
we are able to create a simple, efficient and more intuitive build process.

### To get started you need to install Gulp.js globally:
- `npm install -g gulp`

#### Available gulp commands and their descriptions:

- [] TODO: check if all are working and update description if neccessary

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