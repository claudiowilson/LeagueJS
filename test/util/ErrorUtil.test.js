describe('ErrorUtil Testsuite', function () {
	'use strict';

	const ErrorUtil = require('../../lib/util/ErrorUtil');
	const ParameterError = require('../../lib/errors/ParameterError');

	const chai = require("chai");
	// const chaiAsPromised = require("chai-as-promised");
	// const should = chai.should;
	const expect = chai.expect;
	// const expect = chai.expect;
	// chai.use(chaiAsPromised);
	chai.should();

	const TestUtil = require('../TestUtil');

	it('throwIfIsArray throws if given Parameter is an Array', function () {
		expect(()=>{ErrorUtil.throwIfIsArray([1,2,3], 'someParameterName');}).to.throw(TypeError, 'someParameterName');
		expect(()=>{ErrorUtil.throwIfIsArray(1);}).not.to.throw(TypeError);
	});
	describe('throwIfNameIsInvalid()', function () {
		it('throws if name contains invalid characters ', function () {
			expect(()=>{ErrorUtil.throwIfNameIsInvalid('n$ame12!§3');}).to.throw('$ | !§');
		});
		it('does not throw if name is valid', function () {
			expect(()=>{ErrorUtil.throwIfNameIsInvalid('na 123 me._');}).not.to.throw('$ | !§');
		});
	});
	describe('throwIfNotBoolean()', function () {
		it('throws if value is not a boolean', function () {
			expect(()=>{ErrorUtil.throwIfNotBoolean('1', 'paramName');}).to.throw();
			expect(()=>{ErrorUtil.throwIfNotBoolean('0', 'paramName');}).to.throw();
			expect(()=>{ErrorUtil.throwIfNotBoolean(1, 'paramName');}).to.throw();
			expect(()=>{ErrorUtil.throwIfNotBoolean(0, 'paramName');}).to.throw();
			expect(()=>{ErrorUtil.throwIfNotBoolean('True', 'paramName');}).to.throw();
			expect(()=>{ErrorUtil.throwIfNotBoolean('False', 'paramName');}).to.throw();
		});
		it('does not throw if value is boolean or booleanlike string', function () {
			expect(()=>{ErrorUtil.throwIfNameIsInvalid('true','paramName');}, 'it threw for a boolean/-like value').not.to.throw('$ | !§');
			expect(()=>{ErrorUtil.throwIfNameIsInvalid('false','paramName');}, 'it threw for a boolean/-like value').not.to.throw('$ | !§');
			expect(()=>{ErrorUtil.throwIfNameIsInvalid(true,'paramName');}, 'it threw for a boolean/-like value').not.to.throw('$ | !§');
			expect(()=>{ErrorUtil.throwIfNameIsInvalid(false,'paramName');}, 'it threw for a boolean/-like value').not.to.throw('$ | !§');
		});
	});
	describe('throwIfRankedQueueConfigIdInvalid()', function () {
		it('throws if value is invalid', function () {
			expect(()=>{ErrorUtil.throwIfRankedQueueConfigIdInvalid('somestring', 'paramName');}).to.throw(ParameterError, 'RANKED_SOLO_5x5');
		});
	});
	describe('throwIfNotObject()', function () {
		it('throws if value is invalid', function () {
			expect(()=>{ErrorUtil.throwIfNotObject('somestring', 'paramName');}, 'did not throw with string').to.throw(TypeError);
			expect(()=>{ErrorUtil.throwIfNotObject(4, 'paramName');}, 'did not throw with number').to.throw(TypeError);
			expect(()=>{ErrorUtil.throwIfNotObject(true, 'paramName');}, 'did not throw with boolean').to.throw(TypeError);
			expect(()=>{ErrorUtil.throwIfNotObject(new Function(), 'paramName');}, 'did not throw with Function').to.throw(TypeError);
		});
		it('does not throw with objects', function () {
			expect(()=>{ErrorUtil.throwIfNotObject({}, 'paramName');}).not.to.throw(TypeError);
		});
	});
	describe('throwIfNotRateLimiter()', function () {
		it('throws if value is not a RateLimiter', function () {
			expect(()=>{ErrorUtil.throwIfNotRateLimiter('somestring', 'paramName');}, 'did not throw with string').to.throw(TypeError);
			expect(()=>{ErrorUtil.throwIfNotRateLimiter(4, 'paramName');}, 'did not throw with number').to.throw(TypeError);
			expect(()=>{ErrorUtil.throwIfNotRateLimiter(true, 'paramName');}, 'did not throw with boolean').to.throw(TypeError);
			expect(()=>{ErrorUtil.throwIfNotRateLimiter(new Function(), 'paramName');}, 'did not throw with Function').to.throw(TypeError);
			expect(()=>{ErrorUtil.throwIfNotRateLimiter({}, 'paramName');}, 'did not throw with object').to.throw(TypeError);
			expect(()=>{ErrorUtil.throwIfNotRateLimiter({
				per10:{na1: {}},
				per600:{na1: {}},
			}, 'paramName');}, 'did not throw with missing Ratelimiters').to.throw(TypeError);
		});
		it('does not throw with RateLimiter instance', function () {
			expect(()=>{ErrorUtil.throwIfNotRateLimiter(TestUtil.createRateLimiter(1,1,true), 'paramName');}).not.to.throw(TypeError);
		});
	});
});