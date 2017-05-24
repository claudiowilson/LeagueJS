describe('League of Legends api wrapper test suite', function() {
	'use strict';

	const LeagueJs = require('../lib/LeagueJS');

	const chai = require("chai");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(should);

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
});