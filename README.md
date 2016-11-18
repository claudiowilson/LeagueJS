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
