describe('ChampionUtil Testsuite', function () {
	'use strict';

	const ChampionUtil = require('../../lib/util/ChampionUtil');
	const TestUtil = require('../TestUtil');

	const chai = require("chai");
	// const chaiAsPromised = require("chai-as-promised");
	// const should = chai.should;
	const expect = chai.expect;
	// const expect = chai.expect;
	// chai.use(chaiAsPromised);
	chai.should();


	describe('getChampionKeysFromName()', function () {
		it('returns the expected key for every champion (depends on StaticData Endpoint!)', function () {
			const config = TestUtil.getTestConfig();
			const StaticEndpoint = require('../../lib/endpoints/StaticDataEndpoint');
			const endpoint = new StaticEndpoint(config);

			return endpoint.gettingChampions('na1').then(({data}) => {
				return Object.keys(data).map(champKey => {
					const champ = data[champKey];
					expect(ChampionUtil.getChampionKeyFromName(champ.name),
						`"${champ.name}" was not correctly transformed into "${champ.key}"`
					).to.equal(champ.key);
				});
			});
		});
	});
});