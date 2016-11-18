describe('Endpoint Testsuite', () => {
    'use strict'

    const endpoint = require ('../lib/endpoints/endpoint');

    const should = require('should');
    const assert = require('assert');

    it('should return the expected url for single values.', (done) => {
      let url = endpoint.buildURL('euw.api.pvp.net', 'euw', '/v1.0/TestEndpoint', 'DummyName', 'TEST-TOKEN');

      url.href.should.be.equal('https://euw.api.pvp.net/euw/v1.0/TestEndpoint/dummyname?api_key=TEST-TOKEN');
      done();
    });

    it('should return the expected url for array values.', (done) => {
      let url = endpoint.buildURL('euw.api.pvp.net', 'euw', '/v1.0/TestEndpoint', [ 'DummyName1', 'DummyName2'], 'TEST-TOKEN');

      url.href.should.be.equal('https://euw.api.pvp.net/euw/v1.0/TestEndpoint/dummyname1,dummyname2?api_key=TEST-TOKEN')
      done();
    });
});