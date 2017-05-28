describe('League of Legends api wrapper test suite', function() {
	'use strict';

	const LeagueJs = require('../lib/LeagueJS');

	const chai = require("chai");
	const should = chai.should;
	const expect = chai.expect;
	chai.should();

	it('should apply the config to the Class', function() {
		let api = new LeagueJs({
			API_KEY: 'test'
		});

		api.config.should.have.property('API_KEY');
		api.config.API_KEY.should.be.equal('test');
	});

	it('should not run without api key', function() {
		expect(() => {
			new LeagueJs();
		}, 'Did not throw error with empty API_KEY.').to.throw('API_KEY');
	});
	it('inherits all the Utility functionality from LeagueUtil', function () {
		LeagueJs.should.have.property('getPlatformIds');
	});

	describe('Endpoints', function () {
		it('are set as properties', function () {
			let api = new LeagueJs({
				API_KEY: 'test'
			});
			LeagueJs.getEndpointNames().forEach(endpointName => {
				api.should.have.property(endpointName);
			});
		});

		it('are stored within internal array', function () {
			let api = new LeagueJs({
				API_KEY: 'test'
			});
			const endpointNames = LeagueJs.getEndpointNames();
			api._endpoints.forEach(endpoint => {
				endpointNames.should.include(endpoint.name);
			});
		});
	});
});