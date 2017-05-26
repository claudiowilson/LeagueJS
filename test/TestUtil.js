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
}

module.exports = TestUtil;