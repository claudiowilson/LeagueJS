describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const RunesEndpoint = require('../../lib/endpoints/RunesEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.should();

	const TestUtil = require('../TestUtil');
	let mergedConfig = TestUtil.getTestConfig();

	const mock_summoner = TestUtil.mocks.summoners.Colorfulstan;


	let endpoint;
	beforeEach(function () {
		let {per10, per600, allowBursts} = mergedConfig.limits;
		endpoint = new RunesEndpoint(mergedConfig, TestUtil.createRateLimiter(per10, per600, allowBursts));
	});

	it('has its name added to default retryEndpoints', function () {
		endpoint.config.limits.retryEndpoints.should.include(endpoint.name);
	});
	describe('gettingBySummoner', function () {
		it('can request runes for a summoner', function () {
			return endpoint.gettingBySummoner(mock_summoner.summonerId, mock_summoner.platformId)
				.should.eventually.have.property('pages');
		});
	});
});