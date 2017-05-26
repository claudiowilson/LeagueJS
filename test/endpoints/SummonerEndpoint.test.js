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
	chai.use(should);

	const mock_summonerName_valid = 'Colorfulstan';
	const mock_summonerName_invalid = 'n$ame12!§3';
	const mock_ColorfulstanPlatformId = 'euw1';
	const mock_ColorfulstanSummonerId = 19115840;
	const mock_ColorfulstanAccountId = 21777671;

	let endpoint;
	beforeEach(function () {
		endpoint = new SummonerEndpoint(mergedConfig, ['euw1']);
	});

	describe('gettingByName', function () {
		it('can request a summoner by name', function () {
			return endpoint.gettingByName(mock_summonerName_valid, mock_ColorfulstanPlatformId)
				.should.eventually.have.property('accountId');
		});

		it('throws if name contains invalid characters ', function () {
			expect(() => {endpoint.gettingByName(mock_summonerName_invalid, mock_ColorfulstanPlatformId);}).to.throw('$ | !§');
		});
	});


	it('can request a summoner by accountId', function () {
		return endpoint.gettingByAccount(mock_ColorfulstanAccountId, mock_ColorfulstanPlatformId)
			.should.eventually.have.property('accountId');
	});

	describe('gettingById', function () {
		it('works with summonerId', function () {
			return endpoint.gettingById(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId)
				.should.eventually.have.property('accountId');
		});

		it('works with accountId', function () {
			return endpoint.gettingById(mock_ColorfulstanAccountId, mock_ColorfulstanPlatformId)
				.should.eventually.have.property('accountId');
		});
	});


	// Note: tests within this sub-suite are not independent
	describe('it can use request-caching if enabled', function () { // TODO: better test-design and move to Endpoint tests
		let cachedEnpoint;

		beforeEach(function () {
			let configWithCachingEnabled = Object.assign({}, mergedConfig);
			configWithCachingEnabled.caching.isEnabled = true;
			cachedEnpoint = new SummonerEndpoint(configWithCachingEnabled, ['euw1']);
			// cachedEnpoint.setCache({isEnabled: true, defaults: conf.caching.defaults}, require('node-cache'));
		});

		it('fils and uses the cache on same requests', function () {
			return cachedEnpoint.gettingById(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then(() => {
				expect(cachedEnpoint.cache.getStats(), 'no keys were cached')
					.to.have.property('keys')
					.and.that.to.equal(1);

				return cachedEnpoint.gettingById(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then(() => {
					return expect(cachedEnpoint.cache.getStats(), 'no keys were hit')
						.to.have.property('hits')
						.and.that.to.equal(1);
				});
			});
		});
		it('repeated (same) requests should take no time (using cached request)', function () {
			const time1 = new Date().getTime();
			 return cachedEnpoint.gettingById(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then(() => {
				const time2 = new Date().getTime();
				 return cachedEnpoint.gettingById(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then(() => {
					const time3 = new Date().getTime();

					const delta1 = time2-time1;
					const delta2 = time3-time2;
					 delta1.should.be.at.least(100);
					 delta2.should.be.at.most(10);
				});
			});
		});
		it('repeated (same) requests should yield the same results', function () {
			return cachedEnpoint.gettingById(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then((response1) => {
				return cachedEnpoint.gettingById(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then((response2) => {
					return expect(response1).to.deep.equal(response2);
				});
			});
		});
	});
});