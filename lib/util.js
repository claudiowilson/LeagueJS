/*global require*/
/*jslint nomen: true*/
'use strict';

var https = require('https'),
    http = require('http'),
    url = require('url'),
    Q = require('q'),
    RateLimiter = require('./rateLimiter'),
    limiterPer10s,
    limiterPer10min,

    craftUrl = function (urlType, region, api, authKey) {
        return 'https://' + region + '.' + urlType + '/' + region + api + 'api_key=' + authKey;
    },
    craftObserverUrl = function(urlType, region, api, authKey) {
        return 'https://' + region + '.' + urlType + api +
            'api_key=' + authKey;
    },
    craftStaticUrl = function(urlType, region, api, authKey) {
        return 'https://' + 'global.' + urlType + '/' + region + api + 'api_key=' + authKey;
    },
    craftStatusUrl = function(urlType, api, region) {
        return 'http://' + urlType + api + region;
    },
    craftTournamentUrl = function(urlType, api, authKey) {
        return 'https://global.' + urlType + '/' + api + 'api_key=' + authKey;
    },
    craftChampionMasteryUrl = function(urlType, region, platformId, api, authKey) {
        return 'https://' + region + '.' + urlType + '/location/' + platformId + api + 'api_key=' + authKey;
    },
    checkLimits = function(callback) {
        if(limiterPer10s === undefined || limiterPer10min === undefined){
            process.nextTick(callback);
            return;
        }

        limiterPer10s.schedule( function(){
            limiterPer10min.schedule(callback);
        });

    },

    getRequest = function (requestUrl, method, body, callback) {
        var jsonObj = '',
            protocol = https;
        
        if (typeof method == 'function') {
            callback = method;
            method = 'GET';
            body = null;
        }
        
        if (typeof body == 'object') {
            body = JSON.stringify(body);
        }

        checkLimits(function (err){

            if(err !== undefined){
                callback(err, null);
            }
            if(requestUrl.indexOf('http://') !== -1) {
                protocol = http;
            }
            var parsedUrl = url.parse(requestUrl);
            var requestData = {
                host: parsedUrl.host,
                path: parsedUrl.path,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body)
                }
            };
            var req = protocol.request(requestData, function (response) {
                response.on('data', function (chunk) {
                    jsonObj += chunk;
                });

                response.on('error', function (error) {
                    callback(error, null);
                });

                response.on('end', function () {
                    if (response.statusCode === 204) {
                        callback(null, null);
                    }

                    try {
                        jsonObj = JSON.parse(jsonObj);
                    } catch (e) {
                        callback(response.statusCode);
                        return;
                    }

                    if (jsonObj.status && jsonObj.status.message !== 200) {
                        callback(jsonObj.status.status_code + ' ' + jsonObj.status.message, null);
                    } else {
                        callback(null, jsonObj);
                    }
                });
            });
            
            req.on('error', function(err) {
               callback(err); 
            });
            
            if (typeof body == 'string') req.write(body);
            req.end();
        });
    },

    makeRequest = function (url, errmsg, key, callback) {
        var deferred = Q.defer();
        getRequest(url, function (err, result) {
            if (err) {
                deferred.reject(new Error(errmsg + err));
            } else {
                if (key) {
                    deferred.resolve(result[key]);
                } else {
                    deferred.resolve(result);
                }
            }
        });
        return deferred.promise.nodeify(callback);
    },

    makeStaticRequest = function(err, data, callback) {
        var deferred = Q.defer();

        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }

        return deferred.promise.nodeify(callback);
    },

    makeCustomRequest = function(url, method, body, errmsg, key, callback) {
        var deferred = Q.defer();
        getRequest(url, method, body, function (err, result) {
            if (err) {
                deferred.reject(new Error(errmsg + err));
            } else {
                if (key) {
                    deferred.resolve(result[key]);
                } else {
                    deferred.resolve(result);
                }
            }
        });
        return deferred.promise.nodeify(callback);
    },

    getValidSeasonParam = function (season) {
        season = parseInt(season);
        return (season === null || season === 3 || season === 2014 || season === 2015);
    },

    getCallbackAndRegion = function (regionOrFunction, region, callback) {
        var regionAndFunction = {
            'region': region,
            'callback': callback
        };

        if (regionOrFunction === undefined) {
            regionAndFunction.callback = undefined;
        } else if (typeof (regionOrFunction) === 'function') {
            regionAndFunction.callback = regionOrFunction;
        } else if (typeof (regionOrFunction) === 'string') {
            regionAndFunction.region = regionOrFunction;
        }

        return regionAndFunction;
    },
    setRateLimit = function (limitPer10s, limitPer10min){
        if(limitPer10s === false || limitPer10s === undefined){
            limiterPer10min = undefined;
            limiterPer10s = undefined;
            return;
        }
        limiterPer10s = new RateLimiter(limitPer10s, 10 * 1000, false);
        limiterPer10min = new RateLimiter(limitPer10min, 10 * 60 * 1000, false);
    };

module.exports = {
    craftUrl: craftUrl,
    craftObserverUrl: craftObserverUrl,
    craftStatusUrl: craftStatusUrl,
    craftStaticUrl: craftStaticUrl,
    craftTournamentUrl: craftTournamentUrl,
    craftChampionMasteryUrl: craftChampionMasteryUrl,
    getRequest: getRequest,
    makeRequest: makeRequest,
    makeStaticRequest: makeStaticRequest,
    makeCustomRequest: makeCustomRequest,
    getValidSeasonParam: getValidSeasonParam,
    getCallbackAndRegion: getCallbackAndRegion,
    setRateLimit: setRateLimit
};
