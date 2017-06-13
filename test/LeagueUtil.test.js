describe('EndpointUtil test suite', function () {
	'use strict';

	const EndpointUtil = require('../lib/util/EndpointUtil');

	const chai = require("chai");
	// const should = chai.should;
	// const expect = chai.expect;
	chai.should();

	describe('getEndpointNames', function () {
		it('returns an array with names', function () {
			EndpointUtil.getEndpointNames().should.be.an('Array');
		});
		it('returns the names of the Endpoint files', function () {
			EndpointUtil.getEndpointNames().should.include('Champion');
		});
	});
});