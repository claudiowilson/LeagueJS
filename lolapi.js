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
	var _baseurl = 'http://prod.api.pvp.net/api';
	var _region = '/na';
	var _championUrl = '/v1.1/champion';
	var _gameUrl = '/v1.1/game/by-summoner/'
	var _leagueUrl = '/v2.1/league/by-summoner/'
	var _statsUrl = '/v1.1/stats/by-summoner/'
	var _summonerUrl = '/v1.1/summoner/'
	var _teamUrl = '/v2.1/team/by-summoner/'

	function _craftUrl(urlType, lolRequired) {
		var base = _baseurl;
		if(lolRequired) base += '/lol'
		return base + _region + urlType + '?api_key=' + _authKey;
	}

	function _makeRequest(url, errmsg, callback) {
		_getRequest(url, function(err, result) {
			if(err) {
				callback(new Error(errmsg + err));
			} else {
				callback(null, result);
			}
		});
	}

	function _getRequest(path, callback) {
		var response;
		
		http.get(path, function(response) {
			response.on('data', function(chunk) {
				response += chunk;
			});

			response.on('error', function(error) {
				callback(error, null);
			});

			response.on('end', function() {
				response = response.replace("[object Object]", ""); //I don't know why this gets appended, but it is invalid JSON
				response = JSON.parse(response);
				if(response['status'] && response['status']['message'] != 200) {
					callback(response['status']['message'], null);
				} else {
					callback(null, response);
				}
			});
		});
	}

	//Public Methods
	League.Stats = {};
	League.Summoner = {};

	League.init = function(key, region) {
		_authKey = key;
		if(region) _region = '/' + region;
	}

	League.Champions = function(callback) {
		var url = _craftUrl(_championUrl, true);
		_makeRequest(url, 'Error getting champions: ', callback);
	}

	League.Game = function(summonerId, callback) {
		var url = _craftUrl(_gameUrl + summonerId + '/recent', true);
		_makeRequest(url, 'Error getting recent games: ', callback);
	}

	League.League = function(summonerId, callback) {
		var url = _craftUrl(_leagueUrl + summonerId);
		_makeRequest(url, 'Error getting league data: ', callback);
	}

	League.Stats.Summary = function(summonerId, callback) {
		var url = _craftUrl(_statsUrl + summonerId + '/summary', true);
		_makeRequest(url, 'Error getting summary data: ', callback);
	}

	League.Stats.Ranked = function(summonerId, callback) {
		var url = _craftUrl(_statsUrl + summonerId + '/ranked', true);
		_makeRequest(url, 'Error getting ranked data: ', callback);
	}

	League.Summoner.Masteries = function(summonerId, callback) {
		var url = _craftUrl(_summonerUrl + summonerId + '/masteries', true);
		_makeRequest(url, 'Error getting mastery data: ', callback);
	}

	League.Summoner.Runes = function(summonerId, callback) {
		var url = _craftUrl(_summonerUrl + summonerId + '/runes', true);
		_makeRequest(url, 'Error getting rune data: ', callback);
	}

	League.Summoner.ByName= function(name, callback) {
		name = name.split(" ").join("");
		var url = _craftUrl(_summonerUrl + 'by-name/' + name, true);
		_makeRequest(url, 'Error getting summoner data using name: ', callback);
	}

	League.Summoner.ID = function(summonerId, callback) {
		var url = _craftUrl(_summonerUrl + summonerId, true);
		_makeRequest(url, 'Error getting summoner data: ', callback);
	}

	League.Summoner.ListNames = function(ids, callback) {
		var url = _craftUrl(_summonerUrl + ids + '/name', true);
		_makeRequest(url, 'Error getting summoner data using list of ids: ', callback);
	}

	League.Team = function(summonerId, callback) {
		var url = _craftUrl(_teamUrl + summonerId);
		_makeRequest(url, 'Error getting summoner teams info: ', callback);
	}



}).call(this);
