describe('RegionAndPlatformUtil test suite', function () {
	'use strict';

	const RegionAndPlatformUtil = require('../../lib/util/RegionAndPlatformUtil');

	const chai = require("chai");
	const should = chai.should;
	const expect = chai.expect;
	chai.should();

	describe('getRegionForPlatformId()', function () {
		it('returns the corresponding region-tag in lower case', function () {
			RegionAndPlatformUtil.getRegionForPlatformId('na1').should.equal('na');
			RegionAndPlatformUtil.getRegionForPlatformId('euw1').should.equal('euw');
			RegionAndPlatformUtil.getRegionForPlatformId('eun1').should.equal('eune');
			RegionAndPlatformUtil.getRegionForPlatformId('la1').should.equal('lan');
			RegionAndPlatformUtil.getRegionForPlatformId('la2').should.equal('las');
			RegionAndPlatformUtil.getRegionForPlatformId('oc1').should.equal('oce');
			RegionAndPlatformUtil.getRegionForPlatformId('tr1').should.equal('tr');
			RegionAndPlatformUtil.getRegionForPlatformId('ru').should.equal('ru');
			RegionAndPlatformUtil.getRegionForPlatformId('br1').should.equal('br');
			RegionAndPlatformUtil.getRegionForPlatformId('kr').should.equal('kr');
			RegionAndPlatformUtil.getRegionForPlatformId('jp1').should.equal('jp');
		});
		it('works case insensitive', function () {
			RegionAndPlatformUtil.getRegionForPlatformId('NA1').should.equal('na');
		});
		it('throws an error if no region is found', function () {
			expect(()=>{RegionAndPlatformUtil.getRegionForPlatformId('wtf');}).to.throw(/No region.*wtf/);
		});
	});
	describe('getPlatformIdForRegion()', function () {
		it('returns the corresponding platformID in lower case', function () {
			RegionAndPlatformUtil.getPlatformIdForRegion('na').should.equal('na1');
			RegionAndPlatformUtil.getPlatformIdForRegion('euw').should.equal('euw1');
			RegionAndPlatformUtil.getPlatformIdForRegion('eune').should.equal('eun1');
			RegionAndPlatformUtil.getPlatformIdForRegion('lan').should.equal('la1');
			RegionAndPlatformUtil.getPlatformIdForRegion('las').should.equal('la2');
			RegionAndPlatformUtil.getPlatformIdForRegion('oce').should.equal('oc1');
			RegionAndPlatformUtil.getPlatformIdForRegion('tr').should.equal('tr1');
			RegionAndPlatformUtil.getPlatformIdForRegion('ru').should.equal('ru');
			RegionAndPlatformUtil.getPlatformIdForRegion('br').should.equal('br1');
			RegionAndPlatformUtil.getPlatformIdForRegion('kr').should.equal('kr');
			RegionAndPlatformUtil.getPlatformIdForRegion('jp').should.equal('jp1');
		});
		it('works case insensitive', function () {
			RegionAndPlatformUtil.getPlatformIdForRegion('NA').should.equal('na1');
		});
		it('throws an error if no region is found', function () {
			expect(()=>{RegionAndPlatformUtil.getPlatformIdForRegion('wtf');}).to.throw(/No platformId.*wtf/);
		});
	});

	describe('getPlatformIdFromPlatformIdOrRegion()', function () {
		it('throws on invalid platformId values', function () {
			expect(()=>{RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion('en1');}).to.throw();
		});
		it('throws on invalid region values', function () {
			expect(()=>{RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion('EN');}).to.throw();
		});
		it('works case insensitive', function () {
			RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion('NA').should.equal('na1');
			RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion('na').should.equal('na1');
			RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion('NA1').should.equal('na1');
			RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion('na1').should.equal('na1');
		});
	});

});