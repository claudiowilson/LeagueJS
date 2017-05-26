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
			return endpoint.gettingList(mock_ColorfulstanPlatformId, {freeToPlay:true})
				.should.eventually.have.property('champions')
				.and.that.have.length.at.least(10);
		});
	});
	describe('gettingById', function () {
		it('can request a specific champion', function () {
			return endpoint.gettingById(mock_akaliChampionId, mock_ColorfulstanPlatformId)
				.should.eventually.have.property('freeToPlay');

		});

		describe('wrong parameters', function () {
			it('throws TypeError if championId is invalid (not numerical)', function () {
				expect(() => {endpoint.gettingById('somestring', mock_ColorfulstanPlatformId);}).to.throw(TypeError);
			});
		});
	});
});