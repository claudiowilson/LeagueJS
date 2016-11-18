describe('League of Legends api wrapper test suite', () => {
    'use strict'

    const LeagueJs = require ('../lib/league');
    const should = require('should');
    const assert = require('assert');

    it('should apply the config to the Class', (done) => {
      let api = new LeagueJs({
        API_KEY: 'test'
      });

      api.config.should.have.property('API_KEY');
      api.config.API_KEY.should.be.equal('test');
      
      done();
    });

    it('should not run without api key', (done) => {
      
      assert.throws(
        () => {
            var t = new LeagueJs();
        },
        'Did not throw error with empty API_KEY.'
      )

      done();
    });
});