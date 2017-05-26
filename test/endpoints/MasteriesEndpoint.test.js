describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const MasteriesEndpoint = require('../../lib/endpoints/MasteriesEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.use(should);

	const TestUtil = require('../TestUtil');
	let mergedConfig = TestUtil.getTestConfig();

	const mock_summoner = TestUtil.mocks.summoners.Colorfulstan;


	let endpoint;
	beforeEach(function () {
		endpoint = new MasteriesEndpoint(mergedConfig, [mock_summoner.platformId]);
	});

	describe('gettingBySummoner', function () {
		it('can request masteries for a summoner', function () {
			return endpoint.gettingBySummoner(mock_summoner.summonerId, mock_summoner.platformId)
				.should.eventually.have.property('pages');
		});
	});
});