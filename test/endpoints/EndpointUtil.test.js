describe('EndpointUtil Testsuite', function () {
	'use strict';

	const EndpointUtil = require('../../lib/EndpointUtil');
	const ParameterError = require('../../lib/errors/ParameterError');

	const chai = require("chai");
	// const chaiAsPromised = require("chai-as-promised");
	// const should = chai.should;
	const expect = chai.expect;
	// const expect = chai.expect;
	// chai.use(chaiAsPromised);
	chai.should();

	const TestUtil = require('../TestUtil');

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
	describe('throwIfNotBoolean()', function () {
		it('throws if value is not a boolean', function () {
			expect(()=>{EndpointUtil.throwIfNotBoolean('1', 'paramName');}).to.throw();
			expect(()=>{EndpointUtil.throwIfNotBoolean('0', 'paramName');}).to.throw();
			expect(()=>{EndpointUtil.throwIfNotBoolean(1, 'paramName');}).to.throw();
			expect(()=>{EndpointUtil.throwIfNotBoolean(0, 'paramName');}).to.throw();
			expect(()=>{EndpointUtil.throwIfNotBoolean('True', 'paramName');}).to.throw();
			expect(()=>{EndpointUtil.throwIfNotBoolean('False', 'paramName');}).to.throw();
		});
		it('does not throw if value is boolean or booleanlike string', function () {
			expect(()=>{EndpointUtil.throwIfNameIsInvalid('true','paramName');}, 'it threw for a boolean/-like value').not.to.throw('$ | !§');
			expect(()=>{EndpointUtil.throwIfNameIsInvalid('false','paramName');}, 'it threw for a boolean/-like value').not.to.throw('$ | !§');
			expect(()=>{EndpointUtil.throwIfNameIsInvalid(true,'paramName');}, 'it threw for a boolean/-like value').not.to.throw('$ | !§');
			expect(()=>{EndpointUtil.throwIfNameIsInvalid(false,'paramName');}, 'it threw for a boolean/-like value').not.to.throw('$ | !§');
		});
	});
	describe('throwIfRankedQueueConfigIdInvalid()', function () {
		it('throws if value is invalid', function () {
			expect(()=>{EndpointUtil.throwIfRankedQueueConfigIdInvalid('somestring', 'paramName');}).to.throw(ParameterError, 'RANKED_SOLO_5x5');
		});
	});
	describe('throwIfNotObject()', function () {
		it('throws if value is invalid', function () {
			expect(()=>{EndpointUtil.throwIfNotObject('somestring', 'paramName');}, 'did not throw with string').to.throw(TypeError);
			expect(()=>{EndpointUtil.throwIfNotObject(4, 'paramName');}, 'did not throw with number').to.throw(TypeError);
			expect(()=>{EndpointUtil.throwIfNotObject(true, 'paramName');}, 'did not throw with boolean').to.throw(TypeError);
			expect(()=>{EndpointUtil.throwIfNotObject(new Function(), 'paramName');}, 'did not throw with Function').to.throw(TypeError);
		});
		it('does not throw with objects', function () {
			expect(()=>{EndpointUtil.throwIfNotObject({}, 'paramName');}).not.to.throw(TypeError);
		});
	});
	describe('throwIfNotRateLimiter()', function () {
		it('throws if value is not a RateLimiter', function () {
			expect(()=>{EndpointUtil.throwIfNotRateLimiter('somestring', 'paramName');}, 'did not throw with string').to.throw(TypeError);
			expect(()=>{EndpointUtil.throwIfNotRateLimiter(4, 'paramName');}, 'did not throw with number').to.throw(TypeError);
			expect(()=>{EndpointUtil.throwIfNotRateLimiter(true, 'paramName');}, 'did not throw with boolean').to.throw(TypeError);
			expect(()=>{EndpointUtil.throwIfNotRateLimiter(new Function(), 'paramName');}, 'did not throw with Function').to.throw(TypeError);
			expect(()=>{EndpointUtil.throwIfNotRateLimiter({}, 'paramName');}, 'did not throw with object').to.throw(TypeError);
			expect(()=>{EndpointUtil.throwIfNotRateLimiter({
				per10:{na1: {}},
				per600:{na1: {}},
			}, 'paramName');}, 'did not throw with missing Ratelimiters').to.throw(TypeError);
		});
		it('does not throw with RateLimiter instance', function () {
			expect(()=>{EndpointUtil.throwIfNotRateLimiter(TestUtil.createRateLimiter(1,1,true), 'paramName');}).not.to.throw(TypeError);
		});
	});

	describe('extractPlatformIdAndOptions()', function () {
		it('throws if options is provided but invalid', function () {
			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null, 'somestring');}, 'did not throw with string as options').to.throw(TypeError, 'options');
			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null, 123);}, 'did not throw with number as options').to.throw(TypeError, 'options');
			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null, ()=>{});}, 'did not throw with Function as options').to.throw(TypeError, 'options');
			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null, []);}, 'did not throw with Array as options').to.throw(TypeError, 'options');
		});
		it('does not throw if options is JSON or falsy', function () {
			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null, {});}).not.to.throw(TypeError, 'options');

			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null, null);}).not.to.throw(TypeError, 'options');
			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null, false);}).not.to.throw(TypeError, 'options');
			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null);}).not.to.throw(TypeError, 'options');
			expect(()=>{EndpointUtil.extractPlatformIdAndOptions(null, 0);}).not.to.throw(TypeError, 'options');
		});

		it('returns an object', function () {
			EndpointUtil.extractPlatformIdAndOptions().should.be.an('object');
			EndpointUtil.extractPlatformIdAndOptions().should.have.property('_platformId', undefined);
			EndpointUtil.extractPlatformIdAndOptions().should.have.property('_options', undefined);
		});

		it('sets the platformId correctly if options is missing', function () {
			const expected = 'euw1';
			EndpointUtil.extractPlatformIdAndOptions('EUW1').should.have.property('_platformId').equal(expected);
			EndpointUtil.extractPlatformIdAndOptions('euw1').should.have.property('_platformId').equal(expected);
			EndpointUtil.extractPlatformIdAndOptions('EUW').should.have.property('_platformId').equal(expected);
			EndpointUtil.extractPlatformIdAndOptions('euw').should.have.property('_platformId').equal(expected);
		});

		it('sets the options correctly if platformId is missing', function () {
			const expected = {anOption: 1};
			EndpointUtil.extractPlatformIdAndOptions(expected).should.have.property('_options').equal(expected);
		});

		it('sets options and platformId correctly if both are given', function () {
			const expectedOptions = {anOption: 1};
			const expectedPlatformId = 'euw1';
			EndpointUtil.extractPlatformIdAndOptions(expectedPlatformId, expectedOptions)
				.should.have.property('_options').equal(expectedOptions);
			EndpointUtil.extractPlatformIdAndOptions(expectedPlatformId, expectedOptions)
				.should.have.property('_platformId').equal(expectedPlatformId);
		});
	});
});