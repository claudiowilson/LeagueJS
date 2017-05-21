describe('Endpoint Testsuite', function () {
	'use strict';

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.use(should);

	const ApiRequest = require('../lib/ApiRequest.class');


	const mock_urlWithJSONResponse = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/Aatrox.json';
	const mock_urlWithNonJSONResponse = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg';
	const mock_urlWith404 = 'http://ddragon.leagueoflegends.com';


	it('needs an url to execute', function () {
		expect(() => {ApiRequest.execute();}).to.throw(require('../lib/errors/ParameterError'));
		expect(() => {ApiRequest.execute(mock_urlWithJSONResponse);}).not.to.throw(require('../lib/errors/ParameterError'));
	});

	describe('valid requests', function () {
		it('are able to make requests to a given (valid) url', function () {
			return ApiRequest.execute(mock_urlWithJSONResponse).should.eventually.be.fulfilled;
		});
		it('will parse JSON responsens', function () {
			return ApiRequest.execute(mock_urlWithJSONResponse).should.eventually.have.property('data');
		});
		it('will provide the body for responses that are not JSON', function () {
			return ApiRequest.execute(mock_urlWithNonJSONResponse).should.eventually.be.fulfilled.and.be.a('string');
		});
	});

	describe('unsuccesful requests', function () {
		it('rejects with an elaborate error object', function () {
			return ApiRequest.execute(mock_urlWith404).should.eventually.be.rejectedWith({
				name: 'StatusCodeError',
				statusCode: 404
			}).and.have.property('message');
		});
		it('rejects with the full response', function () {
			return ApiRequest.execute(mock_urlWith404).should.eventually.be.rejected.and.have.property('response');
		});

		it('rejects with the options set for the request', function () {
			return ApiRequest.execute(mock_urlWith404).should.eventually.be.rejected.and.have.property('options')
				.and.that.to.have.property('url').equals(mock_urlWith404);
		});
	});

	describe('options', function () {
		it('execute() can return the full response from the request', function () {
			return ApiRequest.execute(mock_urlWithJSONResponse, true).should.eventually.be.an('object').and.have.property('headers');
		});
	});

	// TODO: tests for RateError with mocked api (e.g. using nock)
});