describe('ChampionMasteryEndpoint Testsuite', function () {
	'use strict';

	const ChampionMasteryEndpoint = require('../../lib/endpoints/ChampionMasteryEndpoint');

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
		endpoint = new ChampionMasteryEndpoint(mergedConfig, TestUtil.createRateLimiter(per10, per600, allowBursts));
	});

	it('has its name added to default retryEndpoints', function () {
		endpoint.config.limits.retryEndpoints.should.include(endpoint.name);
	});

	describe('gettingBySummoner', function () {
		it('can request a summoner by id', function () {
			return endpoint.gettingBySummoner(mock_summoner.summonerId, mock_summoner.platformId).then(result => {
				result.should.be.an('Array');
				result[0].should.have.property('championPoints');
			});
		});

		describe('wrong parameters', function () {
			it('gets rejected with TypeError if summonerId is invalid (not numerical)', function () {
				return endpoint.gettingBySummoner('somestring', mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if summonerId is not given', function () {
				return endpoint.gettingBySummoner(mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if summonerId is null', function () {
				return endpoint.gettingBySummoner(null, mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
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
			it('gets rejected with TypeError if summonerId is invalid (not numerical)', function () {
				return endpoint.gettingBySummonerForChampion('somestring', TestUtil.mocks.champions.Akali.id, mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if summonerId is not given', function () {
				return endpoint.gettingBySummonerForChampion(TestUtil.mocks.champions.Akali.id, mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if summonerId is null', function () {
				return endpoint.gettingBySummonerForChampion(null, TestUtil.mocks.champions.Akali.id, mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if championId is invalid (not numerical)', function () {
				return endpoint.gettingBySummonerForChampion(mock_summoner.summonerId, 'somestring', mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if championId is not given', function () {
				return endpoint.gettingBySummonerForChampion(mock_summoner.summonerId, mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if championId is null', function () {
				return endpoint.gettingBySummonerForChampion(mock_summoner.summonerId, null, mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
		});
	});
	describe('gettingScoresBySummoner', function () {
		it('can request the scores for the summoner', function () {
			return endpoint.gettingScoresBySummoner(mock_summoner.summonerId, mock_summoner.platformId)
				.should.eventually.be.a('number');
		});
		describe('wrong parameters', function () {
			it('gets rejected with TypeError if summonerId is invalid (not numerical)', function () {
				return endpoint.gettingBySummoner('somestring', mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if summonerId is not given', function () {
				return endpoint.gettingBySummoner(mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
			it('gets rejected with TypeError if summonerId is null', function () {
				return endpoint.gettingBySummoner(null, mock_summoner.platformId).should.eventually.be.rejectedWith(TypeError);
			});
		});
	});
});