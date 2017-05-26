describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const LolStatusEndpoint = require('../../lib/endpoints/LolStatusEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.use(should);

	const TestUtil = require('../TestUtil');
	let mergedConfig = TestUtil.getTestConfig();


	let endpoint;
	beforeEach(function () {
		endpoint = new LolStatusEndpoint(mergedConfig, ['na1']);
	});

	it('gets the status of the shard specified by the platformId', function () {
		return endpoint.gettingShardData('na1').should.eventually.have.property('slug').equal('na');
	});
});