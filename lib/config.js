let RequestCache = require('./requestCache');

module.exports = {
	'API_KEY': process.env.LEAGUE_API_KEY,
	'PLATFORM_ID': process.env.LEAGUE_API_PLATFORM_ID,
	'API_HOST': 'api.riotgames.com',
	'API_VERSION': 'v3',
	'caching': {
		'cache': RequestCache,
		'ttl': {
			'champion': 120
		}
	},
	'limits': {
		'per10': 10,
		'per600': 500,
		'allowBursts': true
	}
};