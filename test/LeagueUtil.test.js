describe('LeagueUtil test suite', function () {
	'use strict';

	const LeagueUtil = require('../lib/LeagueUtil');

	const chai = require("chai");
	// const should = chai.should;
	const expect = chai.expect;
	chai.should();

	const TestUtil = require('./TestUtil');

	describe('getVersionForGameVersion()', function () {
		it('gets the data dragon version based on the latest version with the same major.minor version', function () {
			const expected = ('5.1.3');
			LeagueUtil.getVersionForGameVersion('5.1.8.123452', ['4.3.1', '5.1.3', '6.0.1'])
				.should.equal(expected);
		});
		describe('multiple same major.minor versions in versions array', function () {
			// NOTE: versions array from static-data only contains a single version per major.minor
			// and is sorted from latest to earliest, so these should not be an issue.
			// Tests are only provided to clarify possible shortcommings of this method.
			it('gets the latest version when versions array is sorted from latest to earliest', function () {
				const expected = ('5.1.5');
				LeagueUtil.getVersionForGameVersion('5.1.8.123452', ['5.1.5', '5.1.3', '5.1.2'])
					.should.equal(expected);
			});
			it('does get the earliest version if versions array is sorted from earliest to latest', function () {
				const expected = ('5.1.2');
				LeagueUtil.getVersionForGameVersion('5.1.8.123452', ['5.1.5', '5.1.3', '5.1.2'].reverse())
					.should.equal(expected);
			});
		});
	});

	describe('getEndpointNames', function () {
		it('returns an array with names', function () {
			LeagueUtil.getEndpointNames().should.be.an('Array');
		});
		it('returns the names of the Endpoint files', function () {
			LeagueUtil.getEndpointNames().should.include('Champion');
		});
	});

	describe('getChampionKeysFromName()', function () {
		it('returns the expected key for every champion (depends on StaticData Endpoint!)', function () {
			const config = TestUtil.getTestConfig();
			const StaticEndpoint = require('../lib/endpoints/StaticDataEndpoint');
			const endpoint = new StaticEndpoint(config);

			return endpoint.gettingChampions('na1').then(({data}) => {
				return Object.keys(data).map(champKey => {
					const champ = data[champKey];
					expect(LeagueUtil.getChampionKeyFromName(champ.name),
						`"${champ.name}" was not correctly transformed into "${champ.key}"`
					).to.equal(champ.key);
				});
			});
		});
	});

});