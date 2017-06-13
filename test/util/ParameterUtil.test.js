describe('ParameterUtil Testsuite', function () {
	'use strict';

	const ParameterUtil = require('../../lib/util/ParameterUtil');

	const chai = require("chai");
	// const chaiAsPromised = require("chai-as-promised");
	// const should = chai.should;
	const expect = chai.expect;
	// const expect = chai.expect;
	// chai.use(chaiAsPromised);
	chai.should();


	describe('extractPlatformIdAndOptions()', function () {
		it('throws if options is provided but invalid', function () {
			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null, 'somestring');}, 'did not throw with string as options').to.throw(TypeError, 'options');
			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null, 123);}, 'did not throw with number as options').to.throw(TypeError, 'options');
			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null, () => {});}, 'did not throw with Function as options').to.throw(TypeError, 'options');
			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null, []);}, 'did not throw with Array as options').to.throw(TypeError, 'options');
		});
		it('does not throw if options is JSON or falsy', function () {
			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null, {});}).not.to.throw(TypeError, 'options');

			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null, null);}).not.to.throw(TypeError, 'options');
			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null, false);}).not.to.throw(TypeError, 'options');
			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null);}).not.to.throw(TypeError, 'options');
			expect(() => {ParameterUtil.extractPlatformIdAndOptions(null, 0);}).not.to.throw(TypeError, 'options');
		});

		it('returns an object', function () {
			ParameterUtil.extractPlatformIdAndOptions().should.be.an('object');
			ParameterUtil.extractPlatformIdAndOptions().should.have.property('_platformId', undefined);
			ParameterUtil.extractPlatformIdAndOptions().should.have.property('_options', undefined);
		});

		it('sets the platformId correctly if options is missing', function () {
			const expected = 'euw1';
			ParameterUtil.extractPlatformIdAndOptions('EUW1').should.have.property('_platformId').equal(expected);
			ParameterUtil.extractPlatformIdAndOptions('euw1').should.have.property('_platformId').equal(expected);
			ParameterUtil.extractPlatformIdAndOptions('EUW').should.have.property('_platformId').equal(expected);
			ParameterUtil.extractPlatformIdAndOptions('euw').should.have.property('_platformId').equal(expected);
		});

		it('sets the platformId correctly if options is undefined', function () {
			const expected = 'euw1';
			ParameterUtil.extractPlatformIdAndOptions('EUW1', undefined).should.have.property('_platformId').equal(expected);
		});

		it('sets the options correctly if platformId is undefined', function () {
			const expected = {anOption: 1};
			ParameterUtil.extractPlatformIdAndOptions(undefined, expected).should.have.property('_options').equal(expected);
		});

		it('sets the options correctly if platformId is null', function () {
			const expected = {anOption: 1};
			ParameterUtil.extractPlatformIdAndOptions(null, expected).should.have.property('_options').equal(expected);
		});

		it('sets the options correctly if platformId is missing', function () {
			const expected = {anOption: 1};
			ParameterUtil.extractPlatformIdAndOptions(expected).should.have.property('_options').equal(expected);
		});

		it('sets options and platformId correctly if both are given', function () {
			const expectedOptions = {anOption: 1};
			const expectedPlatformId = 'euw1';
			ParameterUtil.extractPlatformIdAndOptions(expectedPlatformId, expectedOptions)
				.should.have.property('_options').equal(expectedOptions);
			ParameterUtil.extractPlatformIdAndOptions(expectedPlatformId, expectedOptions)
				.should.have.property('_platformId').equal(expectedPlatformId);
		});
	});
});