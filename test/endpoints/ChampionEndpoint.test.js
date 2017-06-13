describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const ChampionEndpoint = require('../../lib/endpoints/ChampionEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	// const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.should();

	const TestUtil = require('../TestUtil');
	let mergedConfig = TestUtil.getTestConfig();

	const mock_summoner = TestUtil.mocks.summoners.Colorfulstan;

	let endpoint;
	beforeEach(function () {
		let {per10, per600, allowBursts} = mergedConfig.limits;
		endpoint = new ChampionEndpoint(mergedConfig, TestUtil.createRateLimiter(per10, per600, allowBursts));
	});

	it('has its name added to default retryEndpoints', function () {
		endpoint.config.limits.retryEndpoints.should.include(endpoint.name);
	});

	describe('gettingList', function () {
		it('can request all champions', function () {
			return endpoint.gettingList(mock_summoner.platformId).then(result => {
				result.should.have.property('champions');
				result.champions.should.be.an('Array')
					.with.length.at.least(136);
			});
		});

		it('can request the free champions', function () {
			return endpoint.gettingList(mock_summoner.platformId, {freeToPlay: true})
				.should.eventually.have.property('champions')
				.with.length.of.at.least(10);
		});
	});
	describe('gettingById', function () {
		it('can request a specific champion', function () {
			return endpoint.gettingById(TestUtil.mocks.champions.Akali.id, mock_summoner.platformId)
				.should.eventually.have.property('freeToPlay');

		});

		describe('wrong parameters', function () {
			it('rejects with TypeError if championId is invalid (not numerical)', function () {
				return endpoint.gettingById('somestring', mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
		});
	});
});