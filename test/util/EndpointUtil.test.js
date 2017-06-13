describe('EndpointUtil Testsuite', function () {
	'use strict';

	const EndpointUtil = require('../../lib/util/EndpointUtil');

	const chai = require("chai");
	// const chaiAsPromised = require("chai-as-promised");
	// const should = chai.should;
	const expect = chai.expect;
	// const expect = chai.expect;
	// chai.use(chaiAsPromised);
	chai.should();

	const TestUtil = require('../TestUtil');

	describe('buildQueryStringFromOptions() builds well formated query strings', function () {
		it('for single value options', function () {
			const options = {something: 123};
			const expected = 'something=123';
			const actual = EndpointUtil.buildQueryStringFromOptions(options);
			expect(actual).to.deep.equal(expected);
		});

		it('for array value options', function () {
			const options = {something: [1, 2, "string"]};
			const expected = 'something=1&something=2&something=string';
			const actual = EndpointUtil.buildQueryStringFromOptions(options);
			expect(actual).to.deep.equal(expected);
		});

		it('for multiple options with mixed values', function () {
			const options = {first: [1, 2, "string"], second: 123, third: 'string'};
			const expected = 'first=1&first=2&first=string&second=123&third=string';
			const actual = EndpointUtil.buildQueryStringFromOptions(options);
			expect(actual).to.deep.equal(expected);
		});
	});
	describe('getEndpointNames', function () {
		it('returns an array with names', function () {
			EndpointUtil.getEndpointNames().should.be.an('Array');
		});
		it('returns the names of the Endpoint files', function () {
			EndpointUtil.getEndpointNames().should.include('Champion');
		});
	});
});