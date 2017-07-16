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