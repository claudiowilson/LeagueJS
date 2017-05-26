describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const ChampionEndpoint = require('../../lib/endpoints/ChampionEndpoint');

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
	const mock_akaliChampionId = 84;

	let endpoint;
	beforeEach(function () {
		endpoint = new ChampionEndpoint(mergedConfig, ['euw1']);
	});

	describe('gettingList', function () {
		it('can request all champions', function () {
			return endpoint.gettingList(mock_ColorfulstanPlatformId).then(result => {
				result.should.have.property('champions');
				result.champions.should.be.an('Array').and.have.length.at.least(136);
			});
		});

		it('can request the free champions', function () {
			return endpoint.gettingList(mock_ColorfulstanPlatformId, {freeToPlay:true}).then(result => {
				result.should.have.property('champions').and.have.length.at.least(10);
			});
		});
	});
	describe('gettingById', function () {
		it('can request a specific champion', function () {
			return endpoint.gettingById(mock_akaliChampionId, mock_ColorfulstanPlatformId).then(result => {
				result.should.have.property('freeToPlay');
			});
		});

		describe('wrong parameters', function () {
			it('throws TypeError if championId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingById('somestring', mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
		});
	});
});