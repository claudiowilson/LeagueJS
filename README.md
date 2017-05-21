LeagueJS
========

[![Join the chat at https://gitter.im/League-JS/Lobby](https://badges.gitter.im/League-JS/Lobby.svg)](https://gitter.im/League-JS/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A Javascript Wrapper for the League of Legends API

## How To Use

Use npm to install it from the npm registry by running `npm install leagueapi`

```
Run `npm install` followed by `node server.js`
```

### Config

TODO: Document config params that can be overwriten

### Environment Variables
Instead of giving an Options object to the LeagueJS Constructor some options will be read from the environment

*LEAGUE_API_KEY* The value of this environmental variable will be used as authorization token  
*LEAGUE_API_REGION* The value of this environmental variable will be used as default region

### Here's the list of methods and their parameters:
`[param]` means you can pass null if you don't want to specify this parameter


### Samples
There are some Sample implementations in samples folder.

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

## Tests

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