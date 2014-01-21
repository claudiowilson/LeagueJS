/*global require*/
/*global exports*/
/*global module*/
/*global console*/
/*jslint nomen: true*/

(function () {

    'use strict';

    var League = {},
        util = require('./util'),
        authKey,
        region = 'na',
        endpoint = 'http://prod.api.pvp.net/api/lol',
        championUrl = '/v1.1/champion',
        gameUrl = '/v1.2/game/by-summoner',
        leagueUrl = '/v2.2/league/by-summoner',
        statsUrl = '/v1.2/stats/by-summoner',
        summonerUrl = '/v1.2/summoner',
        teamUrl = '/v2.2/team/by-summoner';

    League.Stats = {};
    
    League.Summoner = {};

    League.init = function (key, region) {
        authKey = key;
        if (region) {
            this.region = region;
        }
    };

    League.getRegions = function (callback) {
        callback(null, {
            'na': 'North America',
            'euw': 'Europe West',
            'eune': 'Europe Nordic and East'
        });
    };

    League.getQueues = function (callback) {
        callback(null, {
            2: 'Normal 5v5 Blind Pick',
            4: 'Ranked Solo 5v5',
            7: 'Coop vs AI 5v5',
            8: 'Normal 3v3',
            14: 'Normal 5v5 Draft Pick',
            16: 'Dominion 5v5 Blind Pick',
            17: 'Dominion 5v5 Draft Pick',
            25: 'Dominion Coop vs AI',
            41: 'Ranked Team 3v3',
            42: 'Ranked Team 5v5',
            52: 'Twisted Treeline Coop vs AI',
            65: 'ARAM',
            67: 'ARAM Coop vs AI'
        });
    };

    League.getMapNames = function (callback) {
        callback(null, {
            1: "Summoner's Rift Summer Variant",
            2: "Summoner's Rift Autumn Variant",
            3: 'The Proving Grounds',
            4: 'Twisted Treeline Original Version',
            8: 'The Crystal Scar',
            10: 'Twisted Treeline Current Version',
            12: 'Howling Abyss'
        });
    };

    League.getChampions = function (freeToPlay, regionOrFunction, callback) {
        var url,
            freetoPlayQuery = '',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback);

        if (!(freeToPlay === null || typeof (freetoPlayQuery) === 'boolean')) {
            console.log('Invalid query parameter for freeToPlay: ' + freeToPlay);
        }

        if (freeToPlay) {
            freetoPlayQuery = 'freeToPlay=true&';
        }

        url = util.craftUrl(endpoint, regionAndFunc.region, championUrl + '?' + freetoPlayQuery, authKey);
        util.makeRequest(url, 'Error getting champions: ', 'champions', regionAndFunc.callback);
    };

    League.getRecentGames = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, gameUrl + '/' + summonerId + '/recent?', authKey);

        util.makeRequest(url, 'Error getting recent games: ', 'games', regionAndFunc.callback);
    };

    League.getLeagueData = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, leagueUrl + '/' + summonerId + '?', authKey);

        util.makeRequest(url, 'Error getting league data: ', null, regionAndFunc.callback);
    };

    League.Stats.getPlayerSummary = function (summonerId, season, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            seasonURL = '',
            url;

        if (util.getValidSeasonParam(season)) {
            if (season) {
                seasonURL = 'season=SEASON' + season + '&';
            }
        } else {
            console.log('Invalid query parameter for season: ' + season);
        }

        url = util.craftUrl(endpoint, regionAndFunc.region, statsUrl + '/' + summonerId + '/summary?' + seasonURL, authKey);
        util.makeRequest(url, 'Error getting summary data: ', 'playerStatSummaries', regionAndFunc.callback);
    };

    League.Stats.getRanked = function (summonerId, season, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            seasonURL = '',
            url;

        if (util.getValidSeasonParam(season)) {
            if (season) {
                seasonURL = 'season=SEASON' + season + '&';
            }
        } else {
            console.log('Invalid query parameter for season: ' + season);
        }

        url = util.craftUrl(endpoint, regionAndFunc.region, statsUrl + '/' + summonerId + '/ranked?' + seasonURL, authKey);
        util.makeRequest(url, 'Error getting ranked data: ', 'champions', regionAndFunc.callback);
    };

    League.Summoner.getMasteries = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + summonerId + '/masteries?', authKey);

        util.makeRequest(url, 'Error getting mastery data: ', 'pages', regionAndFunc.callback);
    };

    League.Summoner.getRunes = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + summonerId + '/runes?', authKey);

        util.makeRequest(url, 'Error getting rune data: ', 'pages', regionAndFunc.callback);
    };

    League.Summoner.getByName = function (name, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;

        name = name.split(" ").join("");
        url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/by-name/' + name + '?', authKey);

        util.makeRequest(url, 'Error getting summoner data using name: ', null, regionAndFunc.callback);
    };

    League.Summoner.getByID = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + summonerId + '?', authKey);

        util.makeRequest(url, 'Error getting summoner data: ', null, regionAndFunc.callback);
    };

    League.Summoner.listNamesByIDs = function (ids, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + ids + '/name?', authKey);

        util.makeRequest(url, 'Error getting summoner data using list of ids: ', 'summoners', regionAndFunc.callback);
    };

    League.getTeams = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, teamUrl + '/' + summonerId + '?', authKey);

        util.makeRequest(url, 'Error getting summoner teams info: ', null, regionAndFunc.callback);
    };

    module.exports = League;
}());