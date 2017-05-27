describe('ChampionMasteryEndpoint Testsuite', function () {
	'use strict';

	const ChampionMasteryEndpoint = require('../../lib/endpoints/ChampionMasteryEndpoint');

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
		let {per10, per600, allowBursts} = mergedConfig.limits;
		endpoint = new ChampionMasteryEndpoint(mergedConfig, TestUtil.createRateLimiter(per10, per600, allowBursts));
	});

	describe('gettingBySummoner', function () {
		it('can request a summoner by id', function () {
			return endpoint.gettingBySummoner(mock_summoner.summonerId, mock_summoner.platformId).then(result => {
				result.should.be.an('Array');
				result[0].should.have.property('championPoints');
			});
		});

		describe('wrong parameters', function () {
			it('throws TypeError if summonerId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingBySummoner('somestring', mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is not given', function () {
				expect(() => {endpoint.gettingBySummoner(mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is null', function () {
				expect(() => {endpoint.gettingBySummoner(null, mock_summoner.platformId);}).to.throw(TypeError);
			});
		});
	});
	describe('gettingBySummonerForChampionId', function () {
		it('can request a specific champion by its id', function () {
			return endpoint.gettingBySummonerForChampion(mock_summoner.summonerId, TestUtil.mocks.champions.Akali.id, mock_summoner.platformId)
				.should.eventually.have.property('championPoints');
		});
		it('works with numerical strings as championId', function () {
			return endpoint.gettingBySummonerForChampion(mock_summoner.summonerId, TestUtil.mocks.champions.Akali.id + '', mock_summoner.platformId)
				.should.eventually.have.property('championPoints');
		});

		describe('wrong parameters', function () {
			it('throws TypeError if summonerId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingBySummonerForChampion('somestring', TestUtil.mocks.champions.Akali.id, mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is not given', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(TestUtil.mocks.champions.Akali.id, mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is null', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(null, TestUtil.mocks.champions.Akali.id, mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if championId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(mock_summoner.summonerId, 'somestring', mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if championId is not given', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(mock_summoner.summonerId, mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if championId is null', function () {
				expect(() => {endpoint.gettingBySummonerForChampion(mock_summoner.summonerId, null, mock_summoner.platformId);}).to.throw(TypeError);
			});
		});
	});
	describe('gettingScoresBySummoner', function () {
		it('can request the scores for the summoner', function () {
			return endpoint.gettingScoresBySummoner(mock_summoner.summonerId, mock_summoner.platformId)
				.should.eventually.be.a('number');
		});
		describe('wrong parameters', function () {
			it('throws TypeError if summonerId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingBySummoner('somestring', mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is not given', function () {
				expect(() => {endpoint.gettingBySummoner(mock_summoner.platformId);}).to.throw(TypeError);
			});
			it('throws TypeError if summonerId is null', function () {
				expect(() => {endpoint.gettingBySummoner(null, mock_summoner.platformId);}).to.throw(TypeError);
			});
		});
	});
});