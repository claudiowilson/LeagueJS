/*global require*/
/*global module*/
/*global console*/
/*jslint nomen: true*/

(function () {

    'use strict';

    var League = {},
        util = require('./util'),
        authKey,
        region = 'na',
        endpoint = 'api.pvp.net/api/lol',
        championUrl = '/v1.2/champion',
        gameUrl = '/v1.3/game/by-summoner',
        leagueUrl = '/v2.4/league/by-summoner',
        statsUrl = '/v1.3/stats/by-summoner',
        summonerUrl = '/v2.2/summoner',
        teamUrl = '/v2.3/team/by-summoner',

        staticUrl = '/static-data',
        itemUrl = '/v1.2/item',
        masteryUrl = '/v1.2/mastery',
        realmUrl = '/v1.2/realm',
        runeUrl = '/v1.2/rune',
        summonerSpellUrl = '/v1.2/summoner-spell',
        versionUrl = '/v1.2/versions';

    League.Stats = {};

    League.Summoner = {};

    League.Static = {};

    League.init = function (key, regionTag) {
        authKey = key;
        if (regionTag) {
            region = regionTag;
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
            1: 'Summoner\'s Rift Summer Variant ',
            2: 'Summoner\'s Rift Autumn Variant',
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

        if (freeToPlay === null || typeof (freeToPlay) !== 'boolean') {
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

    League.getLeagueEntryData = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, leagueUrl + '/' + summonerId + '/entry?', authKey);

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

        url = util.craftUrl(endpoint, regionAndFunc.region,
                statsUrl + '/' + summonerId + '/summary?' + seasonURL, authKey);
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

        url = util.craftUrl(endpoint, regionAndFunc.region,
                statsUrl + '/' + summonerId + '/ranked?' + seasonURL, authKey);
        util.makeRequest(url, 'Error getting ranked data: ', 'champions', regionAndFunc.callback);
    };

    League.Summoner.getMasteries = function (summonerIds, regionOrFunction, callback) {
        if(Array.isArray(summonerIds)){
            summonerIds = summonerIds.join();
        }
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction,
                region,
                callback),
            url = util.craftUrl(endpoint, regionAndFunc.region,
                    summonerUrl + '/' + summonerIds + '/masteries?', authKey);

        util.makeRequest(url, 'Error getting mastery data: ', null, regionAndFunc.callback);
    };

    League.Summoner.getRunes = function (summonerIds, regionOrFunction, callback) {
        if(Array.isArray(summonerIds)){
            summonerIds = summonerIds.join();
        }
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + summonerIds + '/runes?', authKey);

        util.makeRequest(url, 'Error getting rune data: ', null, regionAndFunc.callback);
    };

    League.Summoner.getByName = function (name, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;

        name = name.split(' ').join('');
        url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/by-name/' + name + '?', authKey);

        util.makeRequest(url, 'Error getting summoner data using name: ', null, regionAndFunc.callback);
    };

    League.Summoner.getByID = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + summonerId + '?', authKey);

        util.makeRequest(url, 'Error getting summoner data: ', null, regionAndFunc.callback);
    };

    League.Summoner.listNamesByIDs = function (ids, regionOrFunction, callback) {
        if(Array.isArray(ids)){
            ids = ids.join();
        }
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + ids + '/name?', authKey);

        util.makeRequest(url, 'Error getting summoner names using list of ids: ', null, regionAndFunc.callback);
    };
    League.Summoner.listSummonerDataByIDs = function (ids, regionOrFunction, callback) {

        if(Array.isArray(ids)){
            ids = ids.join();
        }
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + ids + '?', authKey);
        util.makeRequest(url, 'Error getting summoner data using list of ids: ', null, regionAndFunc.callback);
    };

    League.getTeams = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, teamUrl + '/' + summonerId + '?', authKey);

        util.makeRequest(url, 'Error getting summoner teams info: ', null, regionAndFunc.callback);
    };

    League.setRateLimit  = function (limitPer10s, limitPer10min) {
        util.setRateLimit(limitPer10s, limitPer10min);
    };

    League.setEndpoint = function (newEndpoint) {
        endpoint = newEndpoint;
    };

    League.getEndpoint = function () {
        return endpoint;
    };
    League.Static.getChampionList = function(options, regionOrFunction, callback) {
        var championListUrl = championUrl + '?';
        if(options) {
            if (options.champData) {
                championListUrl += '&champData=' + options.champData;
            }

            if (options.dataById) {
                championListUrl += '&dataById=true';
            }

            if (options.version) {
                championListUrl += '&version=' + options.version;
            }

            if (options.locale) {
                championListUrl += '&locale=' + options.locale;
            }

        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, championListUrl + '&', authKey);
        util.makeRequest(url, 'Error getting static champion list: ', null, regionAndFunc.callback);
    };

    League.Static.getChampionById = function(id, options, regionOrFunction, callback) {
        var championListUrl = championUrl + '/' + id + '?';

        if(options) {
            if (options.champData) {
                championListUrl += '&champData=' + options.champData;
            }

            if (options.version) {
                championListUrl += '&version=' + options.version;
            }

            if (options.locale) {
                championListUrl += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, championListUrl + '&', authKey);
        util.makeRequest(url, 'Error getting static champion by id: ', null, regionAndFunc.callback);
    };

    League.Static.getItemList = function(options, regionOrFunction, callback) {
        var itemListUrl = itemUrl + '?';
        if (options) {
            if (options.itemListData) {
                itemListUrl += '&itemListData=' + options.itemListData;
            }

            if (options.version) {
                itemListUrl += '&version=' + options.version;
            }

            if (options.locale) {
                itemListUrl += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, itemListUrl + '&', authKey);
        util.makeRequest(url, 'Error getting static item list: ', null, regionAndFunc.callback);
    };

    League.Static.getItemById = function(id, options, regionOrFunction, callback) {
        var itemListUrl = itemUrl + '/' + id + '?';
        if (options) {
            if (options.itemData) {
                itemListUrl += '&itemData=' + options.itemData;
            }

            if (options.version) {
                itemListUrl += '&version=' + options.version;
            }

            if (options.locale) {
                itemListUrl += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, itemListUrl + '&', authKey);
        util.makeRequest(url, 'Error getting static item by id: ', null, regionAndFunc.callback);
    };

    League.Static.getMasteryList = function(options, regionOrFunction, callback) {
        var masteryListUrl = masteryUrl + '?';
        if (options) {
            if (options.masteryListData) {
                masteryListUrl += '&masteryListData=' + options.masteryListData;
            }

            if (options.version) {
                masteryListUrl += '&version=' + options.version;
            }

            if (options.locale) {
                masteryListUrl += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, masteryListUrl + '&', authKey);
        util.makeRequest(url, 'Error getting mastery list : ', null, regionAndFunc.callback);
    };

    League.Static.getMasteryById = function(id, options, regionOrFunction, callback) {
        var masteryIdUrl = masteryUrl + '/' + id + '?';
        if (options) {
            if (options.masteryData) {
                masteryIdUrl += '&masteryData=' + options.masteryData;
            }

            if (options.version) {
                masteryIdUrl += '&version=' + options.version;
            }

            if (options.locale) {
                masteryIdUrl += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, masteryIdUrl + '&', authKey);
        util.makeRequest(url, 'Error getting mastery by id: ', null, regionAndFunc.callback);
    };

    League.Static.getRealm = function(regionOrFunction, callback) {
        var realmIdUrl = realmUrl + '?';
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, realmIdUrl + '&', authKey);
        util.makeRequest(url, 'Error getting realm: ', null, regionAndFunc.callback);
    };

    League.Static.getRuneList = function(options, regionOrFunction, callback) {
        var runeListUrl = runeUrl + '?';
        if (options) {
            if (options.runeListData) {
                runeListUrl += '&runeListData=' + options.runeListData;
            }

            if (options.version) {
                runeListUrl += '&version=' + options.version;
            }

            if (options.locale) {
                runeListUrl += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, runeListUrl + '&', authKey);
        util.makeRequest(url, 'Error getting rune list : ', null, regionAndFunc.callback);
    };

    League.Static.getRuneById= function(id, options, regionOrFunction, callback) {
        var runeListUrl = runeUrl + '/' + id + '?';
        if (options) {
            if (options.runeData) {
                runeListUrl += '&runeData=' + options.runeData;
            }

            if (options.version) {
                runeListUrl += '&version=' + options.version;
            }

            if (options.locale) {
                runeListUrl += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, runeListUrl + '&', authKey);
        util.makeRequest(url, 'Error getting rune by id : ', null, regionAndFunc.callback);
    };

    League.Static.getSummonerSpellList = function(options, regionOrFunction, callback) {
        var summonerSpellList = summonerSpellUrl + '?';
        if (options) {
            if (options.spellData) {
                summonerSpellList += '&spellData=' + options.spellData;
            }

            if (options.version) {
                summonerSpellList += '&version=' + options.version;
            }

            if (options.locale) {
                summonerSpellList += '&locale=' + options.locale;
            }

            if (options.dataById) {
                summonerSpellList += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, summonerSpellList + '&', authKey);
        util.makeRequest(url, 'Error getting summoner spell list : ', null, regionAndFunc.callback);
    };

    League.Static.getSummonerSpellById = function(id, options, regionOrFunction, callback) {
        var summonerSpellList = summonerSpellUrl + '/' + id + '?';
        if (options) {
            if (options.spellData) {
                summonerSpellList += '&spellData=' + options.spellData;
            }

            if (options.version) {
                summonerSpellList += '&version=' + options.version;
            }

            if (options.locale) {
                summonerSpellList += '&locale=' + options.locale;
            }

            if (options.dataById) {
                summonerSpellList += '&locale=' + options.locale;
            }
        }

        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, summonerSpellList + '&', authKey);
        util.makeRequest(url, 'Error getting summoner spell by id : ', null, regionAndFunc.callback);
    };

    League.Static.getVersions = function(regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint + staticUrl, regionAndFunc.region, versionUrl + '?', authKey);
        util.makeRequest(url, 'Error getting versions: ', null, regionAndFunc.callback);
    };

    module.exports = League;
}());
