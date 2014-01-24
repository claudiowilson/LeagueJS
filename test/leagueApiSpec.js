/*global describe*/
/*global require*/
/*global beforeEach*/
/*global it*/
/*global xit*/

describe('League of Legends api wrapper test suite', function () {
    'use strict';


    var sinon = require('sinon'),
        should = require('should'),
        leagueApi = require('../lib/lolapi'),
        mockChampionArray = ['Teemo', 'Ahri', 'Vladimir'];


    beforeEach(function () {
        leagueApi.init('input api key here', 'na');
    });

    it('should be able to retrieve all champions', function (done) {

        leagueApi.getChampions(false, 'na', function (err, res) {

            should.not.exist(err);
            should.exist(res);
            res.length.should.be.greaterThan(0);
            done();
        });
    });

    xit('should be able to retrieve all of the free champions', function (done) {

    });

    xit('should throw an error if given the wrong type ', function (done) {

    });
});