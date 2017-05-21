describe('EndpointUtil Testsuite', function () {
	'use strict';

	const SummonerEndpoint = require('../../lib/endpoints/SummonerEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.use(should);

	// NOTE: add your dev-api key to the config.json before running
	const config = require('../config.json');
	process.env.LEAGUE_API_KEY = config.API_KEY;
	process.env.LEAGUE_API_PLATFORM_ID = config.LEAGUE_API_PLATFORM_ID || 'na1';
	if (typeof config.API_KEY === 'undefined' || config.API_KEY === '') {
		throw new Error("The API_KEY is needed. Please add it to /test/config.json");
	}
	const conf = require('../../lib/config');
	Object.assign(config, conf);

	const mock_summonerName_valid = 'Colorfulstan';
	const mock_summonerName_invalid = 'n$ame12!§3';
	const mock_ColorfulstanPlatformId = 'euw1';
	const mock_ColorfulstanSummonerId = 19115840;
	const mock_ColorfulstanAccountId = 21777671;

	let endpoint;
	beforeEach(function () {
		endpoint = new SummonerEndpoint(config);
	});

	describe('getByName', function () {
		it('can request a summoner by name', function () {
			return endpoint.getByName(mock_summonerName_valid, mock_ColorfulstanPlatformId).should.eventually.have.property('accountId');
		});

		it('throws if name contains invalid characters ', function () {
			expect(()=>{endpoint.getByName(mock_summonerName_invalid, mock_ColorfulstanPlatformId);}).to.throw('$ | !§');
		});
	});


	it('can request a summoner by accountId', function () {
		return endpoint.getByAccount(mock_ColorfulstanAccountId, mock_ColorfulstanPlatformId).should.eventually.have.property('accountId');
	});

	describe('getById', function () {
		it('works with summonerId', function () {
			return endpoint.getById(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).should.eventually.have.property('accountId');
		});

		it('works with accountId', function () {
			return endpoint.getById(mock_ColorfulstanAccountId, mock_ColorfulstanPlatformId).should.eventually.have.property('accountId');
		});
	});
});