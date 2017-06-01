const LeagueJs = require('../lib/LeagueJS.js');

const api =
	new LeagueJs('your-api-key or add to process.env.LEAGUE_API_KEY', {
		PLATFORM_ID: LeagueJs.getPlatformIdForRegion('euw')
	});

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