const RequestCache = require('./RequestCache');

module.exports = {
	'API_KEY': process.env.LEAGUE_API_KEY,
	'PLATFORM_ID': process.env.LEAGUE_API_PLATFORM_ID,
	'API_HOST': 'api.riotgames.com',
	'API_VERSION': 'v3',
	'caching': {
		'isEnabled': false,
		'constructor': RequestCache,
		'defaults': {
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
	},
	'limits': {
		'per10': 10,
		'per600': 500,
		'allowBursts': true
	}
};