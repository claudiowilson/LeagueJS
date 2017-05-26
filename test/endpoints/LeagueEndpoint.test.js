describe('LeagueEndpoint Testsuite', function () {
	'use strict';

	const LeagueEndpoint = require('../../lib/endpoints/LeagueEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.use(should);

	const deepmerge = require('deepmerge');

	// NOTE: add your dev-api key to the config.json before running
	const config = require('../config.json');
	process.env.LEAGUE_API_KEY = config.API_KEY;
	process.env.LEAGUE_API_PLATFORM_ID = config.LEAGUE_API_PLATFORM_ID || 'na1';
	if (typeof config.API_KEY === 'undefined' || config.API_KEY === '') {
		throw new Error("The API_KEY is needed. Please add it to /test/config.json");
	}
	const conf = require('../../lib/config');
	let mergedConfig = deepmerge(conf, config);

	const mock_ColorfulstanSummonerId = 19115840;
	const mock_ColorfulstanPlatformId = 'euw1';
	const mock_rankedSoloQueueConfigId = 'RANKED_SOLO_5x5';

	let endpoint;
	beforeEach(function () {
		endpoint = new LeagueEndpoint(mergedConfig, ['euw1']);
	});

	describe('gettingChallengerLeague', function () {
		it('can request the challenger league for a region/queue', function () {
			return endpoint.gettingChallengerLeague(mock_rankedSoloQueueConfigId, mock_ColorfulstanPlatformId).then(result => {
				result.should.have.property('queue').and.that.to.equal(mock_rankedSoloQueueConfigId);
			});
		});
	});
	describe('gettingMasterLeague', function () {
		it('can request the master league for a region/queue', function () {
			return endpoint.gettingMasterLeague(mock_rankedSoloQueueConfigId, mock_ColorfulstanPlatformId).then(result => {
				result.should.have.property('queue').and.that.to.equal(mock_rankedSoloQueueConfigId);
			});
		});
	});
	describe('gettingLeagueForSummonerId', function () {
		it('can request the leagues for a specific summonerId', function () {
			return endpoint.gettingLeagueForSummonerId(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then(result => {
				result.should.be.an('Array');
			});
		});
	});

	describe('gettingPositionsForSummonerId', function () {
		it('can request the league positions for a specific summonerId', function () {
			return endpoint.gettingLeagueForSummonerId(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then(result => {
				result.should.be.an('Array');
			});
		});
	});
});