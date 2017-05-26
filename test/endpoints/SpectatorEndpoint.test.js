describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const SpectatorEndpoint = require('../../lib/endpoints/SpectatorEndpoint');

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
		endpoint = new SpectatorEndpoint(mergedConfig, [mock_summoner.platformId]);
	});

	describe('getttingFeaturedGames', function () {
		it('can get 5 live games for given platformId', function () {
			return endpoint.gettingFeaturedGames(mock_summoner.platformId)
				.should.eventually.have.property('gameList')
				.an('Array')
				.with.lengthOf(5);
		});
	});
	describe('gettingActiveGame', function () {

		let summonerFromFeaturedGames;

		// TODO: make this independent.
		// Currently depending on gettingFeaturedGames and SummonerEndpoint.
		// Could be isolated by using either http interceptor or mocking ApiRequest or Endpoint (with 'rewire' for example)
		beforeEach(function () {
			const SummonerEndpoint = require('../../lib/endpoints/SummonerEndpoint');
			const summonerEndpoint = new SummonerEndpoint(mergedConfig, [mock_summoner.platformId]);
			return endpoint.gettingFeaturedGames(mock_summoner.platformId).then(({gameList}) => {
				return summonerEndpoint.gettingByName(gameList[0].participants[0].summonerName, mock_summoner.platformId).then(summoner => {
					summonerFromFeaturedGames = summoner;
				});
			});
		});

		// NOTE: depents on gettingFeaturedGames
		it('can request the current game for a summoner', function () {
			return endpoint.gettingActiveGame(summonerFromFeaturedGames.id, mock_summoner.platformId)
				.should.eventually.have.property('gameId');

		});
	});
});