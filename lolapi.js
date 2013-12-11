var http = require('http');
var querystring = require('querystring');

(function() {
	var League = {};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
              exports = module.exports = League;
        }
		exports.LeagueAPI = League;
	}

	var _authKey;
	var _baseurl = 'http://prod.api.pvp.net/api/lol/';
	var _region = 'na';
	var _version = '1.1';
	var _championUrl = '/champion';

	function _craftUrl(urlType) {
		return _baseurl + _region + '/v' + _version + urlType + '?api_key=' + _authKey;
	}

	function _getRequest(path, callback) {
		var response;
		if(!_authKey) callback(new Error('You have not given an auth key for the API'));
		
		http.get(path, function(response) {
			response.on('data', function(chunk) {
				response += chunk;
			});

			response.on('error', function(error) {
				callback(error, null);
			});

			response.on('end', function() {
				callback(null, response);
			});
		});
	}

	League.init = function(key, region, version) {
		_authKey = key;
	}

	League.Champions = function(callback) {
		var url = _craftUrl(_championUrl);

		_getRequest(url, function(err, champs) {
			if(err) {
				callback(new Error('Error getting champions: ') + err);
			} else {
				callback(null, champs);
			}
		});
	};


}).call(this);