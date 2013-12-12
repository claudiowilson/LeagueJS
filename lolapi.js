var http = require('http');

(function() {
	var League = {};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
		    exports = module.exports = League;
		}
		exports.leagueapi = League;
	}

	//Private methods and variables
	var _authKey;
	var _region = 'na';
	var _version2Endpoint = 'http://prod.api.pvp.net/api';
	var _version1Endpoint = 'http://prod.api.pvp.net/api/lol';
	var _championUrl = '/v1.1/champion';
	var _gameUrl = '/v1.1/game/by-summoner'
	var _leagueUrl = '/v2.1/league/by-summoner'
	var _statsUrl = '/v1.1/stats/by-summoner'
	var _summonerUrl = '/v1.1/summoner'
	var _teamUrl = '/v2.1/team/by-summoner'

	function _craftUrl(urlType, region, api) {
		return urlType + '/' + region + api + 'api_key=' + _authKey;
	}

	function _makeRequest(url, errmsg, key, callback) {
		if(!callback) return;
		_getRequest(url, function(err, result) {
			if(err) {
				callback(new Error(errmsg + err));
			} else {
				if(key) {
					callback(null, result[key]);
				} else {
					callback(null, result);
				}
			}
		});
	}

	function _getCallbackAndRegion(regionOrFunction, callback) {
		var regionAndFunction = {
			'region' : _region,
			'callback' : callback
		}

		if(typeof(regionOrFunction) == 'function') {
			regionAndFunction['callback'] = regionOrFunction;
		} else if (typeof(regionOrFunction) == 'string') {
			regionAndFunction['region'] = regionOrFunction;
		}

		return regionAndFunction;
	}

	function _getRequest(path, callback) {
		var jsonObj = '';
		
		http.get(path, function(response) {
			response.on('data', function(chunk) {
				jsonObj += chunk;
			});

			response.on('error', function(error) {
				callback(error, null);
			});

			response.on('end', function() {
				if(response.statusCode != 200) {
					callback(response.statusCode);
					return;
				}

				jsonObj = JSON.parse(jsonObj);
				if(jsonObj['status'] && jsonObj['status']['message'] != 200) {
					callback(jsonObj['status']['message'], null);
				} else {
					callback(null, jsonObj);
				}
			});
		});
	}

	//Public Methods
	League.Stats = {};
	League.Summoner = {};

	League.init = function(key, region) {
		_authKey = key;
		if(region) _region = region;
	}

	League.Champions = function(regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);

		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _championUrl + '?');
		_makeRequest(url, 'Error getting champions: ', 'champions', regionAndFunc.callback);
	}

	League.Game = function(summonerId, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);

		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _gameUrl + '/' + summonerId + '/recent?');
		_makeRequest(url, 'Error getting recent games: ', 'games', regionAndFunc.callback);
	}

	League.League = function(summonerId, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);

		var url = _craftUrl(_version2Endpoint, regionAndFunc.region, _leagueUrl + '/' + summonerId + '?');
		_makeRequest(url, 'Error getting league data: ', null, regionAndFunc.callback);
	}

	League.Stats.Summary = function(summonerId, season, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);
		var seasonURL = '';

		if(season) seasonURL = 'season=SEASON' + season + '&';
		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _statsUrl + '/' + summonerId + '/summary?' + seasonURL);
		_makeRequest(url, 'Error getting summary data: ', 'playerStatSummaries', regionAndFunc.callback);
	}

	League.Stats.Ranked = function(summonerId, season, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);
		var seasonURL = '';

		if(season) seasonURL = 'season=SEASON' + season + '&';
		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _statsUrl + '/' + summonerId + '/ranked?' + seasonURL);
		_makeRequest(url, 'Error getting ranked data: ', 'champions', regionAndFunc.callback);
	}

	League.Summoner.Masteries = function(summonerId, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);

		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _summonerUrl + '/' + summonerId + '/masteries?');
		console.log(url);
		_makeRequest(url, 'Error getting mastery data: ', 'pages', regionAndFunc.callback);
	}

	League.Summoner.Runes = function(summonerId, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);

		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _summonerUrl + '/' + summonerId + '/runes?');
		_makeRequest(url, 'Error getting rune data: ', 'pages', regionAndFunc.callback);
	}

	League.Summoner.ByName= function(name, regionOrFunction, callback) {
		name = name.split(" ").join("");
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);

		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _summonerUrl + '/by-name/' + name + '?');
		_makeRequest(url, 'Error getting summoner data using name: ', null, regionAndFunc.callback);
	}

	League.Summoner.ID = function(summonerId, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);
		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _summonerUrl + '/' + summonerId + '?');
		_makeRequest(url, 'Error getting summoner data: ', null, regionAndFunc.callback);
	}

	League.Summoner.ListNames = function(ids, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);
		var url = _craftUrl(_version1Endpoint, regionAndFunc.region, _summonerUrl + '/' + ids + '/name?');
		_makeRequest(url, 'Error getting summoner data using list of ids: ', 'summoners', regionAndFunc.callback);
	}

	League.Team = function(summonerId, regionOrFunction, callback) {
		var regionAndFunc = _getCallbackAndRegion(regionOrFunction, callback);
		var url = _craftUrl(_version2Endpoint, regionAndFunc.region, _teamUrl + '/' + summonerId + '?');
		_makeRequest(url, 'Error getting summoner teams info: ', null, regionAndFunc.callback);
	}



}).call(this);
