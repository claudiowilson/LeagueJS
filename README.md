LeagueJS
========

[![Join the chat at https://gitter.im/League-JS/Lobby](https://badges.gitter.im/League-JS/Lobby.svg)](https://gitter.im/League-JS/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A Javascript Wrapper for the League of Legends API

## How To Use
// TODO: rework this doc-part
Use npm to install it from the npm registry by running `npm install leagueapi`

```
Run `npm install` followed by `node server.js`
```

### Config

TODO: Document config params that can be overwriten

### Environment Variables
Some Options can be read from the Environment

*LEAGUE_API_KEY* The value of this environmental variable will be used as authorization token  
*LEAGUE_API_PLATFORM_ID* The value of this environmental variable will be used as default platformId. If not provided, 'na1' is used.

Alternatively they can be provided to the League constructor within the options parameter
```
const leagueApi = new League({API_KEY: <Your Api key>, PLATFORM_ID: <default api region>})
```

### Caching

By default, caching is disabled. If enabled, the default caching is using node-cache with the request-urls as caching-key
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

Full set of caching defaults:
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

You have following options to manipulate which Caching implementation is used or to change the settings for it:
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

// replacing Cache within Summoner endpoint
leagueJS.Summoner.setCache({ stdTTL: 120}, MyCache)

// replacing Cache-options within Summoner endpoint
leagueJS.Summoner.setCache({ stdTTL: 120})

leagueJS.Summoner.enableCaching();
leagueJS.Summoner.disableCaching();

// Same options for all endpoints
leagueJS.setCache({ stdTTL: 120}, MyCache)
leagueJS.setCache({ stdTTL: 120})
leagueJS.enableCaching();
leagueJS.disableCaching();
```

### Here's the list of methods and their parameters:
`[param]` means you can pass null if you don't want to specify this parameter
// TODO: rework this doc-part

### Samples
There are some Sample implementations in samples folder.

## LeagueJS Gulp Commands
// TODO: propably rework this doc-part

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

## Tests

LEAGUE_API_KEY and LEAGUE_API_PLATFORM_ID will be read from config.json within ```/test/```.
This is added to .gitignore to prevent publishing your API-key.
Before running tests you will need to add your developer Key here.
Structure of the config.json will mirror ```/lib/config.js``` if you want to change other values used for testing
like rate-limits

```
// /test/config.json
{
	"API_KEY": <your api key>,
	  "limits": {
	  // for running the API-tests on CI a lot of this is recommended to be set to false, so that the RateLimiter will
	  // space out the requests to prevent hitting the rate limit.
	  // When running single test-suites during development it should be true to speed up execution significantly
        "allowBursts": true,
        "per10": 10,
        "per600": 500
      }
}
```


For testing, mocha + chai with needed plugins is used.
Chai provides a natural, readable interface for test-creation and using the appropriate Plugins keeps tests simple,
readable and comprehensible.

Some important notes (mostly common unit-testing best practices):

* design your tests so that they also can act as documentation. This means the test-description should explain what is tested,
and all tests should describe the functionality tested.

* keep tests short and simple and group them into sub-suites where advantageous for a better understanding and discoverability.

* rather write two very short and atomic tests instead of testing multiple things within the same test.

* if a test requires setup, do this setup scoped to this test / sub-suite with the before()/beforeEach() functions mocha provides.
Don't forget to clean up your setup afterwards with after()/afterEach() if you need to reset it between tests/suites

* always define imports, constants, variables etc. within the respective Test-suite to keep them scoped to that very test-suite
and to prevent leaking mocked dependencies and variables into other test-suites.
Same Principle is true for different sub-suites / test-case isolation within the test-suites.

* define mock-objects that are reused on top of the Test-suite and with a unambiguos, speaking name that describes it's purpose.

* to be able to set mocha options within the tests (e.g. timeout() ) easily,
it is important that the test-cases are defined by using the function syntax, not the ```()=>{}``` syntax.


#### possibly deprecated packages

* q
* html