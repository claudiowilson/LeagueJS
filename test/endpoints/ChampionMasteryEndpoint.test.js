describe('EndpointUtil Testsuite', function () {
	'use strict';

	const ChampionMasteryEndpoint = require('../../lib/endpoints/ChampionMasteryEndpoint');

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

	const mock_ColorfulstanPlatformId = 'euw1';
	const mock_ColorfulstanSummonerId = 19115840;
	const mock_akaliChampionId = 84;

	let endpoint;
	beforeEach(function () {
		endpoint = new ChampionMasteryEndpoint(mergedConfig, ['euw1']);
	});

	describe('gettingBySummoner', function () {
		it('can request a summoner by id', function () {
			return endpoint.gettingBySummoner(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then(result => {
				result.should.be.an('Array');
				result[0].should.have.property('championPoints');
			});
		});

		describe('wrong parameters', function () {
			it('throws TypeError if summonerId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingBySummoner('somestring', mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is not given', function () {
				expect(() => {endpoint.gettingBySummoner(mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is null', function () {
				expect(() => {endpoint.gettingBySummoner(null, mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
		});
	});
	describe('gettingBySummonerForChampionId', function () {
		it('can request a specific champion by its id', function () {
			return endpoint.gettingBySummonerForChampion(mock_ColorfulstanSummonerId, mock_akaliChampionId, mock_ColorfulstanPlatformId).then(result => {
				result.should.have.property('championPoints');
			});
		});
		it('works with numerical strings as championId', function () {
			return endpoint.gettingBySummonerForChampion(mock_ColorfulstanSummonerId, mock_akaliChampionId + '', mock_ColorfulstanPlatformId).then(result => {
				result.should.have.property('championPoints');
			});
		});

		describe('wrong parameters', function () {
			it('throws TypeError if summonerId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingBySummonerForChampion('somestring', mock_akaliChampionId, mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is not given', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(mock_akaliChampionId, mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is null', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(null, mock_akaliChampionId, mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if championId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(mock_ColorfulstanSummonerId, 'somestring', mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if championId is not given', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if championId is null', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(mock_ColorfulstanSummonerId, null, mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
		});
	});
	describe('gettingScoresBySummoner', function () {
		it('can request the scores for the summoner', function () {
			return endpoint.gettingScoresBySummoner(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId).then(result => {
				result.should.be.a('number');
			});
		});
		describe('wrong parameters', function () {
			it('throws TypeError if summonerId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingBySummoner('somestring', mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is not given', function () {
				expect(() => {endpoint.gettingBySummoner(mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is null', function () {
				expect(() => {endpoint.gettingBySummoner(null, mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
		});
	});
});