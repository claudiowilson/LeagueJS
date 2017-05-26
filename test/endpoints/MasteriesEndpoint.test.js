describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const MasteriesEndpoint = require('../../lib/endpoints/MasteriesEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.use(should);

	const TestUtil = require('../TestUtil');
	let mergedConfig = TestUtil.getTestConfig();

	const mock_ColorfulstanPlatformId = 'euw1';
	const mock_ColorfulstanSummonerId = 19115840;


	let endpoint;
	beforeEach(function () {
		endpoint = new MasteriesEndpoint(mergedConfig, ['euw1']);
	});

	describe('gettingBySummoner', function () {
		it('can request masteries for a summoner', function () {
			return endpoint.gettingBySummoner(mock_ColorfulstanSummonerId, mock_ColorfulstanPlatformId)
				.should.eventually.have.property('pages');
		});
	});
});