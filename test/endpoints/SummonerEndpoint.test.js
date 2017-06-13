describe('SummonerEndpoint Testsuite', function () {
	'use strict';

	const SummonerEndpoint = require('../../lib/endpoints/SummonerEndpoint');

	const TestUtil = require('../TestUtil');
	let mergedConfig = TestUtil.getTestConfig();

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.should();

	const mock_summoner = TestUtil.mocks.summoners.Colorfulstan;
	const mock_invalidName = TestUtil.mocks.invalidData.summonerName;

	let endpoint;
	beforeEach(function () {
		let {per10, per600, allowBursts} = mergedConfig.limits;
		endpoint = new SummonerEndpoint(mergedConfig, TestUtil.createRateLimiter(per10, per600, allowBursts));
	});

	it('has its name added to default retryEndpoints', function () {
		endpoint.config.limits.retryEndpoints.should.include(endpoint.name);
	});
	describe('gettingByName', function () {
		it('can request a summoner by name', function () {
			return endpoint.gettingByName(mock_summoner.name, mock_summoner.platformId)
				.should.eventually.have.property('accountId');
		});

		it('rejects if name contains invalid characters ', function () {
			return endpoint.gettingByName(mock_invalidName, mock_summoner.platformId).should.eventually.be.rejectedWith('$ | !§');
		});
	});


	it('can request a summoner by accountId', function () {
		return endpoint.gettingByAccount(mock_summoner.accountId, mock_summoner.platformId)
			.should.eventually.have.property('accountId');
	});

	describe('gettingById', function () {
		it('works with summonerId', function () {
			return endpoint.gettingById(mock_summoner.summonerId, mock_summoner.platformId)
				.should.eventually.have.property('accountId');
		});

		it('works with accountId', function () {
			return endpoint.gettingById(mock_summoner.accountId, mock_summoner.platformId)
				.should.eventually.have.property('accountId');
		});
	});


	// Note: tests within this sub-suite are not independent
	describe('it can use request-caching if enabled', function () { // TODO: better test-design and move to Endpoint tests
		let cachedEnpoint;

		beforeEach(function () {
			let configWithCachingEnabled = Object.assign({}, mergedConfig);
			configWithCachingEnabled.caching.isEnabled = true;

			let {per10, per600, allowBursts} = mergedConfig.limits;
			cachedEnpoint = new SummonerEndpoint(configWithCachingEnabled, TestUtil.createRateLimiter(per10, per600, allowBursts));
			// cachedEnpoint.setCache({isEnabled: true, defaults: conf.caching.defaults}, require('node-cache'));
		});

		it('fils and uses the cache on same requests', function () {
			return cachedEnpoint.gettingById(mock_summoner.summonerId, mock_summoner.platformId).then(() => {
				expect(cachedEnpoint.cache.getStats(), 'no keys were cached')
					.to.have.property('keys')
					.equal(1);

				return cachedEnpoint.gettingById(mock_summoner.summonerId, mock_summoner.platformId).then(() => {
					return expect(cachedEnpoint.cache.getStats(), 'no keys were hit')
						.to.have.property('hits')
						.equal(1);
				});
			});
		});
		it('repeated (same) requests should take no time (using cached request)', function () {
			const time1 = new Date().getTime();
			 return cachedEnpoint.gettingById(mock_summoner.summonerId, mock_summoner.platformId).then(() => {
				const time2 = new Date().getTime();
				 return cachedEnpoint.gettingById(mock_summoner.summonerId, mock_summoner.platformId).then(() => {
					const time3 = new Date().getTime();

					const delta1 = time2-time1;
					const delta2 = time3-time2;
					 delta1.should.be.at.least(100);
					 delta2.should.be.at.most(10);
				});
			});
		});
		it('repeated (same) requests should yield the same results', function () {
			return cachedEnpoint.gettingById(mock_summoner.summonerId, mock_summoner.platformId).then((response1) => {
				return cachedEnpoint.gettingById(mock_summoner.summonerId, mock_summoner.platformId).then((response2) => {
					return expect(response1).to.deep.equal(response2);
				});
			});
		});
	});
});