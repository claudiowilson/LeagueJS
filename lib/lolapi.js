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
        statusEndpoint = 'status.leagueoflegends.com',
        tournamentEndpoint = 'api.pvp.net/tournament/public/v1',
        championMasteryEndpoint = 'api.pvp.net/championmastery',
        championUrl = '/v1.2/champion',
        gameUrl = '/v1.3/game/by-summoner',
        leagueUrl = {
            summoner: '/v2.5/league/by-summoner',
            team: '/v2.5/league/by-team'
        },
        statsUrl = '/v1.3/stats/by-summoner',
        summonerUrl = '/v1.4/summoner',
        matchUrl = '/v2.2/match',
        matchHistoryUrl = '/v2.2/matchlist/by-summoner',
        observerUrl = 'api.pvp.net/observer-mode/rest',
        teamUrl = '/v2.4/team/',
        staticUrl = '/static-data';
    League.Stats = {};

    League.Summoner = {};

    League.Static = {};
    
    League.Tournament = {};

    League.ChampionMastery = {};

    League.init = function (key, regionTag) {
        authKey = key;
        if (regionTag) {
            region = regionTag;
        }
    };

    League.getRegions = function (callback) {
        var regions = {
            'na': 'North America',
            'euw': 'Europe West',
            'eune': 'Europe Nordic and East'
        };
        return util.makeStaticRequest(error, regions);
    };

    League.getPlatformId = function (region, callback) {
        var platforms = {
                'na': 'NA1',
                'euw': 'EUW1',
                'eune': 'EUN1',
                'lan': 'LA1',
                'las': 'LA2',
                'oce': 'OC1',
                'tr': 'TR1',
                'ru': 'RU',
                'br': 'BR1',
                'kr': 'KR',
                'jp': 'JP1'
            },
            platformId,
            error;
        platformId = platforms[region];
        error = platformId ? null : 'Invalid region';
        return util.makeStaticRequest(error, platformId);
    };

    League.getQueues = function (callback) {
        var queues = {
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
        };
        return util.makeStaticRequest(null, queues);
    };

    League.getMapNames = function (callback) {
        var maps ={
            1: 'Summoner\'s Rift Summer Variant ',
            2: 'Summoner\'s Rift Autumn Variant',
            3: 'The Proving Grounds',
            4: 'Twisted Treeline Original Version',
            8: 'The Crystal Scar',
            10: 'Twisted Treeline Current Version',
            12: 'Howling Abyss'
        };
        return util.makeStaticRequest(null, maps);
    };

    League.getShards = function(callback) {
        var shards = '/shards',
            url = util.craftStatusUrl(statusEndpoint, shards, '');

        return util.makeRequest(url, 'Error getting shards: ', null, callback);
    };

    League.getShardByRegion = function(regionOrFunction, callback) {
        var shards = '/shards',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftStatusUrl(statusEndpoint, shards,  '/' + regionAndFunc.region);
        return util.makeRequest(url, 'Error getting shards by region ', null, callback);
    };

    League.getMatch = function(matchId, includeTimelineOrFunction, regionOrFunction, callback) {
        var url,
            regionAndFunc;
        if (typeof(includeTimelineOrFunction) === 'function'){
            regionAndFunc = util.getCallbackAndRegion(includeTimelineOrFunction, region, callback);
        } else {
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback);
        }
        if (includeTimelineOrFunction) {
            includeTimelineOrFunction = 'includeTimeline=true&';
        } else {
            includeTimelineOrFunction = '';
        }
        url = util.craftUrl(endpoint, regionAndFunc.region, matchUrl + '/' +
            matchId + '?' + includeTimelineOrFunction, authKey);
        return util.makeRequest(url, 'Error getting match: ', null, regionAndFunc.callback);
    };

    League.getMatchForTournament = function(matchId, tournamentCode, includeTimelineOrFunction, regionOrFunction, callback) {
        var url,
            regionAndFunc;
        if (typeof(includeTimelineOrFunction) === 'function'){
            regionAndFunc = util.getCallbackAndRegion(includeTimelineOrFunction, region, callback);
        } else {
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback);
        }
        if (includeTimelineOrFunction) {
            includeTimelineOrFunction = 'includeTimeline=true&';
        } else {
            includeTimelineOrFunction = '';
        }
        url = util.craftUrl(endpoint, regionAndFunc.region, matchUrl + '/for-tournament/' +
            matchId + '?' + includeTimelineOrFunction + 'tournamentCode=' + tournamentCode + '&', authKey);
        return util.makeRequest(url, 'Error getting tournament match: ', null, regionAndFunc.callback);
    };

    League.getMatchIdsByTournament = function(tournamentCode, regionOrFunction, callback) {
        var url,
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback);

        url = util.craftUrl(endpoint, regionAndFunc.region, matchUrl + '/by-tournament/' +
            tournamentCode + '/ids?', authKey);
        return util.makeRequest(url, 'Error getting tournament match ids: ', null, regionAndFunc.callback);
    };

    League.getMatchHistory = function(summonerId, options, regionOrFunction, callback) {
        var url,
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            historyOptions = '';
        if(options) {
            if (options.championIds) {
                historyOptions += '&championIds=' + options.championIds.join();
            }
            if (options.rankedQueues) {
                historyOptions += '&rankedQueues=' + options.rankedQueues.join();
            }
            if (options.beginIndex) {
                historyOptions += '&beginIndex=' + options.beginIndex;
            }
            if (options.endIndex) {
                historyOptions += '&endIndex=' + options.endIndex;
            }
            if (options.beginTime) {
                historyOptions += '&beginTime=' + options.beginTime;
            }
            if (options.endTime) {
                historyOptions += '&endTime=' + options.endTime;
            }
            historyOptions += '&';
            historyOptions = historyOptions.substr(1);
        }
        url = util.craftUrl(endpoint, regionAndFunc.region, matchHistoryUrl + '/' +
            summonerId + '?' + historyOptions, authKey);
        return util.makeRequest(url, 'Error getting match history: ', null, regionAndFunc.callback);
    };
    League.getCurrentGame = function(summonerId, regionOrFunction, callback) {
        var currentGameUrl = '/consumer/getSpectatorGameInfo',
            url,
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            platformId;

        return League.getPlatformId(regionAndFunc.region)
            .then(function(platformId) {
                url = util.craftObserverUrl(observerUrl, regionAndFunc.region, currentGameUrl + '/' +
                    platformId + '/' + summonerId + '?', authKey);

                return util.makeRequest(url, 'Error getting current game: ', null, regionAndFunc.callback);
            })
    };
    League.getFeaturedGames = function(regionOrFunction, callback) {
        var featuredUrl = '/featured',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftObserverUrl(observerUrl, regionAndFunc.region, featuredUrl + '?', authKey);
        return util.makeRequest(url, 'Error getting current game: ', null, regionAndFunc.callback);
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
        return util.makeRequest(url, 'Error getting champions: ', 'champions', regionAndFunc.callback);
    };

    League.getRecentGames = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, gameUrl + '/' + summonerId + '/recent?', authKey);

        return util.makeRequest(url, 'Error getting recent games: ', 'games', regionAndFunc.callback);
    };

    League.getLeagueData = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, leagueUrl.summoner + '/' + summonerId + '?', authKey);

        return util.makeRequest(url, 'Error getting league data: ', null, regionAndFunc.callback);
    };

    League.getTeamLeagueData = function(teamId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, leagueUrl.team + '/' + teamId + '?', authKey);

        return util.makeRequest(url, 'Error getting league data: ', null, regionAndFunc.callback);
    };

    League.getLeagueEntryData = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, leagueUrl.summoner + '/' + summonerId + '/entry?', authKey);

        return util.makeRequest(url, 'Error getting league data: ', null, regionAndFunc.callback);
    };

    League.getTeamLeagueEntryData = function (teamId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, leagueUrl.team + '/' + teamId + '/entry?', authKey);

        return util.makeRequest(url, 'Error getting league data: ', null, regionAndFunc.callback);
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
        return util.makeRequest(url, 'Error getting summary data: ', 'playerStatSummaries', regionAndFunc.callback);
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
        return util.makeRequest(url, 'Error getting ranked data: ', 'champions', regionAndFunc.callback);
    };

    League.Summoner.getMasteries = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction,
            region,
            callback),
            url = util.craftUrl(endpoint, regionAndFunc.region,
                summonerUrl + '/' + summonerId + '/masteries?', authKey);
        return util.makeRequest(url, 'Error getting mastery data: ', null, regionAndFunc.callback);
    };

    League.Summoner.getRunes = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + summonerId + '/runes?', authKey);

        return util.makeRequest(url, 'Error getting rune data: ', null, regionAndFunc.callback);
    };

    League.Summoner.getByName = function (name, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;

        name = encodeURIComponent(name.split(' ').join(''));
        url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/by-name/' + name + '?', authKey);

        return util.makeRequest(url, 'Error getting summoner data using name: ', null, regionAndFunc.callback);
    };

    League.Summoner.getByID = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + summonerId + '?', authKey);

        return util.makeRequest(url, 'Error getting summoner data: ', null, regionAndFunc.callback);
    };

    League.Summoner.listNamesByIDs = function (ids, regionOrFunction, callback) {
        if(Array.isArray(ids)){
            ids = ids.join();
        }
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + ids + '/name?', authKey);

        return util.makeRequest(url, 'Error getting summoner names using list of ids: ', null, regionAndFunc.callback);
    };
    League.Summoner.listSummonerDataByIDs = function (ids, regionOrFunction, callback) {

        if(Array.isArray(ids)){
            ids = ids.join();
        }
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, summonerUrl + '/' + ids + '?', authKey);
        return util.makeRequest(url, 'Error getting summoner data using list of ids: ', null, regionAndFunc.callback);
    };

    League.getTeams = function (summonerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftUrl(endpoint, regionAndFunc.region, teamUrl + 'by-summoner/' + summonerId + '?', authKey);

        return util.makeRequest(url, 'Error getting summoner teams info: ', null, regionAndFunc.callback);
    };

    League.getTeam = function (teamId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url  = util.craftUrl(endpoint, regionAndFunc.region, teamUrl + teamId + '?', authKey);

        return util.makeRequest(url, 'Error gettin Team info: ', null, regionAndFunc.callback);
    };

    League.setRateLimit  = function (limitPer10s, limitPer10min) {
        util.setRateLimit(limitPer10s, limitPer10min);
    };

    League.setEndpoint = function (newEndpoint) {
        endpoint = newEndpoint;
    };

    League.setSummonerUrl = function (newPath) {
        summonerUrl = newPath;
    };

    League.getSummonerUrl = function (newPath) {
        return summonerUrl;
    };

    League.getEndpoint = function () {
        return endpoint;
    };
    League.Static.getChampionList = function(options, regionOrFunction, callback) {
        var championListUrl = '/v1.2/champion?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
        if(options) {
            if (options.champData) {
                var champData = [].concat(options.champData);
                championListUrl += '&champData=' + champData.join();
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
            championListUrl += '&';

        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, championListUrl, authKey);
        return util.makeRequest(url, 'Error getting static champion list: ', null, regionAndFunc.callback);
    };

    League.Static.getChampionById = function(id, options, regionOrFunction, callback) {
        var championListUrl = '/v1.2/champion/' + id + '?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;

        if(options) {
            if (options.champData) {
                var champData = [].concat(options.champData);
                championListUrl += '&champData=' + champData.join();
            }

            if (options.version) {
                championListUrl += '&version=' + options.version;
            }

            if (options.locale) {
                championListUrl += '&locale=' + options.locale;
            }
            championListUrl += '&';
        }

        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, championListUrl, authKey);
        return util.makeRequest(url, 'Error getting static champion by id: ', null, regionAndFunc.callback);
    };

    League.Static.getItemList = function(options, regionOrFunction, callback) {
        var itemListUrl = '/v1.2/item?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
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
            itemListUrl += '&';
        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, itemListUrl, authKey);
        return util.makeRequest(url, 'Error getting static item list: ', null, regionAndFunc.callback);
    };

    League.Static.getItemById = function(id, options, regionOrFunction, callback) {
        var itemListUrl = '/v1.2/item/' + id + '?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
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
            itemListUrl += '&';
        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, itemListUrl, authKey);
        return util.makeRequest(url, 'Error getting static item by id: ', null, regionAndFunc.callback);
    };

    League.Static.getMasteryList = function(options, regionOrFunction, callback) {
        var masteryListUrl = '/v1.2/mastery?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
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
            masteryListUrl += '&';
        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, masteryListUrl, authKey);
        return util.makeRequest(url, 'Error getting mastery list : ', null, regionAndFunc.callback);
    };

    League.Static.getMasteryById = function(id, options, regionOrFunction, callback) {
        var masteryIdUrl = '/v1.2/mastery/' + id + '?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
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
            masteryIdUrl += '&';
        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, masteryIdUrl, authKey);
        return util.makeRequest(url, 'Error getting mastery by id: ', null, regionAndFunc.callback);
    };

    League.Static.getRealm = function(regionOrFunction, callback) {
        var realmUrl = '/v1.2/realm?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, realmUrl, authKey);
        return util.makeRequest(url, 'Error getting realm: ', null, regionAndFunc.callback);
    };

    League.Static.getRuneList = function(options, regionOrFunction, callback) {
        var runeListUrl = '/v1.2/rune?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
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
            runeListUrl += '&';
        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, runeListUrl, authKey);
        return util.makeRequest(url, 'Error getting rune list : ', null, regionAndFunc.callback);
    };

    League.Static.getRuneById= function(id, options, regionOrFunction, callback) {
        var runeListUrl = '/v1.2/rune/' + id + '?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
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
            runeListUrl += '&';
        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, runeListUrl, authKey);
        return util.makeRequest(url, 'Error getting rune by id : ', null, regionAndFunc.callback);
    };

    League.Static.getSummonerSpellList = function(options, regionOrFunction, callback) {
        var summonerSpellUrl = '/v1.2/summoner-spell?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
        if (options) {
            if (options.spellData) {
                summonerSpellUrl += '&spellData=' + options.spellData;
            }

            if (options.version) {
                summonerSpellUrl += '&version=' + options.version;
            }

            if (options.locale) {
                summonerSpellUrl += '&locale=' + options.locale;
            }

            if (options.dataById) {
                summonerSpellUrl += '&dataById=' + options.dataById;
            }
            summonerSpellUrl += '&';
        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, summonerSpellUrl, authKey);
        return util.makeRequest(url, 'Error getting summoner spell list : ', null, regionAndFunc.callback);
    };

    League.Static.getSummonerSpellById = function(id, options, regionOrFunction, callback) {
        var summonerSpellUrl = '/v1.2/summoner-spell/' + id + '?',
            regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url;
        if (options) {
            if (options.spellData) {
                summonerSpellUrl += '&spellData=' + options.spellData;
            }

            if (options.version) {
                summonerSpellUrl += '&version=' + options.version;
            }

            if (options.locale) {
                summonerSpellUrl += '&locale=' + options.locale;
            }

            if (options.dataById) {
                summonerSpellUrl += '&dataById=' + options.dataById;
            }
            summonerSpellUrl += '&';
        }
        url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, summonerSpellUrl, authKey);
        return util.makeRequest(url, 'Error getting summoner spell by id : ', null, regionAndFunc.callback);
    };

    League.Static.getVersions = function(regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback),
            url = util.craftStaticUrl(endpoint + staticUrl, regionAndFunc.region, '/v1.2/versions?', authKey);
        return util.makeRequest(url, 'Error getting versions: ', null, regionAndFunc.callback);
    };
    
    League.Tournament.createProvider = function(region, callbackUrl, callback) {
        var url = util.craftTournamentUrl(tournamentEndpoint, 'provider?', authKey);
        return util.makeCustomRequest(url, 'POST', {
            region: region,
            url: callbackUrl
        }, 'Error creating tournament provider: ', null, callback);
    };

    League.Tournament.createTournament = function(name, providerId, callback) {
        var url = util.craftTournamentUrl(tournamentEndpoint, 'tournament?', authKey);
        return util.makeCustomRequest(url, 'POST', {
            name: name,
            providerId: providerId
        }, 'Error creating tournament: ', null, callback);
    };

    League.Tournament.createCode = function(tournamentId, count, options, callback) {
        var url = util.craftTournamentUrl(tournamentEndpoint, 'code?tournamentId=' + tournamentId +
            '&count=' + count + '&', authKey);
        
        var bodyData = {};
        if (typeof options.teamSize != 'undefined') bodyData.teamSize = options.teamSize;
        if (typeof options.allowedSummonerIds != 'undefined') 
            bodyData.allowedSummonerIds = {participants: options.allowedSummonerIds};
        if (typeof options.spectatorType != 'undefined') bodyData.spectatorType = options.spectatorType;
        if (typeof options.pickType != 'undefined') bodyData.pickType = options.pickType;
        if (typeof options.mapType != 'undefined') bodyData.mapType = options.mapType;
        if (typeof options.metadata != 'undefined') bodyData.metadata = options.metadata;
        
        return util.makeCustomRequest(url, 'POST', bodyData, 'Error creating tournament code: ', null, callback);
    };

    League.Tournament.updateCode = function(tournamentCode, options, callback) {
        var url = util.craftTournamentUrl(tournamentEndpoint, 'code/' + tournamentCode + '?', authKey);

        var bodyData = {};
        if (typeof options.allowedParticipants != 'undefined')
            bodyData.allowedParticipants = options.allowedParticipants.join(',');
        if (typeof options.spectatorType != 'undefined') bodyData.spectatorType = options.spectatorType;
        if (typeof options.pickType != 'undefined') bodyData.pickType = options.pickType;
        if (typeof options.mapType != 'undefined') bodyData.mapType = options.mapType;

        return util.makeCustomRequest(url, 'PUT', bodyData, 'Error updating tournament code: ', null, callback);
    };

    League.Tournament.getCode = function(tournamentCode, callback) {
        var url = util.craftTournamentUrl(tournamentEndpoint, 'code/' + tournamentCode + '?', authKey);

        return util.makeRequest(url, 'Error getting tournament code: ', null, callback);
    };

    League.Tournament.getLobbyEventsByCode = function(tournamentCode, callback) {
        var url = util.craftTournamentUrl(tournamentEndpoint, 'lobby/events/by-code/' + tournamentCode + '?', authKey);

        return util.makeRequest(url, 'Error getting lobby events: ', null, callback);
    };

    League.ChampionMastery.getChampions = function(playerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback)

        return League.getPlatformId(regionAndFunc.region)
            .then(function(platformId) {
                var url = util.craftChampionMasteryUrl(championMasteryEndpoint, regionAndFunc.region, platformId, '/player/' + playerId + '/champions?', authKey);

                return util.makeRequest(url, 'Error getting champion mastery champions: ', null, regionAndFunc.callback);
            });
    };

    League.ChampionMastery.getChampion = function(playerId, championId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback)

        return League.getPlatformId(regionAndFunc.region)
            .then(function(platformId) {
                var url = util.craftChampionMasteryUrl(championMasteryEndpoint, regionAndFunc.region, platformId, '/player/' + playerId + '/champion/' + championId + '?', authKey);

                return util.makeRequest(url, 'Error getting champion mastery champions: ', null, regionAndFunc.callback);
            });
    };

    League.ChampionMastery.getScore = function(playerId, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback)

        return League.getPlatformId(regionAndFunc.region)
            .then(function(platformId) {
                var url = util.craftChampionMasteryUrl(championMasteryEndpoint, regionAndFunc.region, platformId, '/player/' + playerId + '/score?', authKey);

                return util.makeRequest(url, 'Error getting champion mastery champions: ', null, regionAndFunc.callback);
            });
    };

    League.ChampionMastery.getTopChampions = function(playerId, count, regionOrFunction, callback) {
        var regionAndFunc = util.getCallbackAndRegion(regionOrFunction, region, callback);
        var countParameter = count ? 'count=' + count + '&' : '';

        return League.getPlatformId(regionAndFunc.region)
            .then(function(platformId) {
                var url = util.craftChampionMasteryUrl(championMasteryEndpoint, regionAndFunc.region, platformId, '/player/' + playerId + '/topchampions?' + countParameter, authKey);

                return util.makeRequest(url, 'Error getting champion mastery champions: ', null, regionAndFunc.callback);
            });
    };

    module.exports = League;
}());
