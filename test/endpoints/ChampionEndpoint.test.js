describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const ChampionEndpoint = require('../../lib/endpoints/ChampionEndpoint');

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
		endpoint = new ChampionEndpoint(mergedConfig, [mock_summoner.platformId]);
	});

	describe('gettingList', function () {
		it('can request all champions', function () {
			return endpoint.gettingList({}, mock_summoner.platformId).then(result => {
				result.should.have.property('champions');
				result.champions.should.be.an('Array')
					.with.length.at.least(136);
			});
		});

		it('can request the free champions', function () {
			return endpoint.gettingList({freeToPlay: true}, mock_summoner.platformId)
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
			it('throws TypeError if championId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingById('somestring', mock_summoner.platformId);})
					.to.throw(TypeError);
			});
		});
	});
});