const deepmerge = require('deepmerge');

class TestUtil {
	static getTestConfig(){
		const testConfig = require('./testConfig.json');
		const defaultConfig = require('../lib/config');
		const mergedConfig = deepmerge(defaultConfig, testConfig);

		// NOTE: add your dev-api key to the config.json before running
		if (typeof mergedConfig.API_KEY === 'undefined' || mergedConfig.API_KEY === '') {
			throw new Error("The API_KEY is needed. Please add it to /test/config.json or as process.env.LEAGUE_API_KEY");
		}
		return mergedConfig;
	}

	static get mocks(){
		let summoners = {
			Colorfulstan: {
				name: 'Colorfulstan',
				summonerId: '19115840',
				accountId: '21777671',
				platformId: 'euw1',
				gameId: 3164960478
			}
		};
		return {
			summoners,
			invalidData: {
				summonerName: 'n$ame12!§3'
			},
			champions: {
				Akali: {
					id: 84
				}
			},
			items: {
				FaeriCharm: {
					id: 1004
				}
			}
		};
	}
}

module.exports = TestUtil;