describe('EndpointUtil Testsuite', function () {
	'use strict';

	const EndpointUtil = require('../../lib/endpoints/EndpointUtil');
	const ParameterError = require('../../lib/errors/ParameterError');

	const chai = require("chai");
	// const chaiAsPromised = require("chai-as-promised");
	// const should = chai.should;
	const expect = chai.expect;
	// const expect = chai.expect;
	// chai.use(chaiAsPromised);
	// chai.use(should);

	it('throwIfParamIsArray throws if given Parameter is an Array', function () {
		expect(()=>{EndpointUtil.throwIfParamIsArray([1,2,3], 'someParameterName');}).to.throw(ParameterError, 'someParameterName');
		expect(()=>{EndpointUtil.throwIfParamIsArray(1);}).not.to.throw(ParameterError);
	});

	describe('buildQueryStringFromOptions() builds well formated query strings', function () {
		it('for single value options', function () {
			const options = {something: 123};
			const expected = 'something=123';
			const actual = EndpointUtil.buildQueryStringFromOptions(options);
			expect(actual).to.deep.equal(expected);
		});

		it('for array value options', function () {
			const options = {something: [1,2,"string"]};
			const expected = 'something=1&something=2&something=string';
			const actual = EndpointUtil.buildQueryStringFromOptions(options);
			expect(actual).to.deep.equal(expected);
		});

		it('for multiple options with mixed values', function () {
			const options = {first: [1,2,"string"], second: 123, third: 'string'};
			const expected = 'first=1&first=2&first=string&second=123&third=string';
			const actual = EndpointUtil.buildQueryStringFromOptions(options);
			expect(actual).to.deep.equal(expected);
		});
	});
	describe('throwIfNameIsInvalid()', function () {
		it('throws if name contains invalid characters ', function () {
			expect(()=>{EndpointUtil.throwIfNameIsInvalid('n$ame12!§3');}).to.throw('$ | !§');
		});
		it('does not throw if name is valid', function () {
			expect(()=>{EndpointUtil.throwIfNameIsInvalid('na 123 me._');}).not.to.throw('$ | !§');
		});
	});
});