describe('LeagueEndpoint Testsuite', function () {
	'use strict';

	const LeagueEndpoint = require('../../lib/endpoints/LeagueEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;

	chai.use(chaiAsPromised);
	chai.should();

	const TestUtil = require('../TestUtil');
	let mergedConfig = TestUtil.getTestConfig();

	const mock_summoner = TestUtil.mocks.summoners.Colorfulstan;
	const mock_rankedSoloQueueConfigId = 'RANKED_SOLO_5x5';

	let endpoint;
	beforeEach(function () {
		let {per10, per600, allowBursts} = mergedConfig.limits;
		endpoint = new LeagueEndpoint(mergedConfig, TestUtil.createRateLimiter(per10, per600, allowBursts));
	});

	it('has its name added to default retryEndpoints', function () {
		endpoint.config.limits.retryEndpoints.should.include(endpoint.name);
	});

	describe('gettingChallengerLeague', function () {
		it('can request the challenger league for a region/queue', function () {
			return endpoint.gettingChallengerLeague(mock_rankedSoloQueueConfigId, mock_summoner.platformId)
				.should.eventually.have.property('queue')
				.equal(mock_rankedSoloQueueConfigId);
		});
	});
	describe('gettingMasterLeague', function () {
		it('can request the master league for a region/queue', function () {
			return endpoint.gettingMasterLeague(mock_rankedSoloQueueConfigId, mock_summoner.platformId)
				.should.eventually.have.property('queue')
				.equal(mock_rankedSoloQueueConfigId);
		});
	});
	describe('gettingLeagueForSummonerId', function () {
		it('can request the leagues for a specific summonerId', function () {
			return endpoint.gettingLeagueForSummonerId(mock_summoner.summonerId, mock_summoner.platformId)
				.should.eventually.be.an('Array');
		});
	});

	describe('gettingPositionsForSummonerId', function () {
		it('can request the league positions for a specific summonerId', function () {
			return endpoint.gettingLeagueForSummonerId(mock_summoner.summonerId, mock_summoner.platformId)
				.should.eventually.be.an('Array');
		});
	});
});