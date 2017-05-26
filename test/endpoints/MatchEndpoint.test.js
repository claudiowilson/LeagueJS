describe('ChampionMasteryEndpoint Testsuite', function () {
	'use strict';

	const MatchEndpoint = require('../../lib/endpoints/MatchEndpoint');

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
		endpoint = new MatchEndpoint(mergedConfig, [mock_summoner.platformId]);
	});

	describe('gettingById', function () {
		it('can request a specific match', function () {
			return endpoint.gettingById(mock_summoner.gameId, mock_summoner.platformId)
				.should.eventually.have.property('gameId');
		});
	});
	describe('gettingListByAccount', function () {
		it('can request the matchlist for an account', function () {
			return endpoint.gettingListByAccount(mock_summoner.accountId, {}, mock_summoner.platformId)
				.should.eventually.have.property('matches')
				.and.that.to.be.an('Array')
				.and.that.to.have.length.at.least(388);
		});
	});
	describe('gettingRecentListByAccount', function () {
		it('can request the most recent matches for an account', function () {
			return endpoint.gettingRecentListByAccount(mock_summoner.accountId, mock_summoner.platformId)
				.should.eventually.have.property('matches')
				.and.that.to.be.an('Array')
				.and.that.to.have.length.at.most(20);
		});
	});
	describe('gettingTimelineById', function () {
		it('can request the timeline for a given match', function () {
			return endpoint.gettingTimelineById(mock_summoner.gameId, mock_summoner.platformId)
				.should.eventually.have.property('frames');
		});
	});
	describe.skip('Tournament related', function () {
		describe('gettingIdsByTournament', function () { // TODO: get tournament api-key to test this
			it('can request the match ids for a tournament', function () {
				// return endpoint.gettingIdsByTournament(..., ...)
				// 	.should.eventually.be.an('Array');
			});
		});
		describe('gettingByIdForTournament', function () { // TODO: get tournament api-key to test this
			it('can request a match within a tournament', function () {
				// return endpoint.gettingIdsByTournament(..., ...)
				// 	.should.eventually.be.an('Array');
			});
		});
	});


});