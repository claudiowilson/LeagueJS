describe('LeagueUtil test suite', function () {
	'use strict';

	const LeagueUtil = require('../lib/LeagueUtil');

	const chai = require("chai");
	const should = chai.should;
	const expect = chai.expect;
	chai.should();

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

	describe('getRegionForPlatformId()', function () {
		it('returns the corresponding region-tag in lower case', function () {
			LeagueUtil.getRegionForPlatformId('na1').should.equal('na');
			LeagueUtil.getRegionForPlatformId('euw1').should.equal('euw');
			LeagueUtil.getRegionForPlatformId('eun1').should.equal('eune');
			LeagueUtil.getRegionForPlatformId('la1').should.equal('lan');
			LeagueUtil.getRegionForPlatformId('la2').should.equal('las');
			LeagueUtil.getRegionForPlatformId('oc1').should.equal('oce');
			LeagueUtil.getRegionForPlatformId('tr1').should.equal('tr');
			LeagueUtil.getRegionForPlatformId('ru').should.equal('ru');
			LeagueUtil.getRegionForPlatformId('br1').should.equal('br');
			LeagueUtil.getRegionForPlatformId('kr').should.equal('kr');
			LeagueUtil.getRegionForPlatformId('jp1').should.equal('jp');
		});
		it('works case insensitive', function () {
			LeagueUtil.getRegionForPlatformId('NA1').should.equal('na');
		});
		it('throws an error if no region is found', function () {
			expect(()=>{LeagueUtil.getRegionForPlatformId('wtf');}).to.throw(/No region.*wtf/);
		});
	});
	describe('getPlatformIdForRegion()', function () {
		it('returns the corresponding platformID in lower case', function () {
			LeagueUtil.getPlatformIdForRegion('na').should.equal('na1');
			LeagueUtil.getPlatformIdForRegion('euw').should.equal('euw1');
			LeagueUtil.getPlatformIdForRegion('eune').should.equal('eun1');
			LeagueUtil.getPlatformIdForRegion('lan').should.equal('la1');
			LeagueUtil.getPlatformIdForRegion('las').should.equal('la2');
			LeagueUtil.getPlatformIdForRegion('oce').should.equal('oc1');
			LeagueUtil.getPlatformIdForRegion('tr').should.equal('tr1');
			LeagueUtil.getPlatformIdForRegion('ru').should.equal('ru');
			LeagueUtil.getPlatformIdForRegion('br').should.equal('br1');
			LeagueUtil.getPlatformIdForRegion('kr').should.equal('kr');
			LeagueUtil.getPlatformIdForRegion('jp').should.equal('jp1');
		});
		it('works case insensitive', function () {
			LeagueUtil.getPlatformIdForRegion('NA').should.equal('na1');
		});
		it('throws an error if no region is found', function () {
			expect(()=>{LeagueUtil.getPlatformIdForRegion('wtf');}).to.throw(/No platformId.*wtf/);
		});
	});

});