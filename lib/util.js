/*global require*/
/*jslint nomen: true*/
'use strict';

var http = require('http'), RateLimiter = require('./rateLimiter'), limiterPer10s, limiterPer10min,

    craftUrl = function (urlType, region, api, authKey) {
        return 'http://' + region + '.' + urlType + '/' + region + api + 'api_key=' + authKey;
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

    getRequest = function (path, callback) {
        var jsonObj = '';
        checkLimits(function (err){
            var request;
            if(err !== undefined){
                callback(err, null);
            }

            request = http.get(path, function (response) {
                response.on('data', function (chunk) {
                    jsonObj += chunk;
                });

                response.on('error', function (error) {
                    callback(error, null);
                });

                response.on('end', function () {
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
            request.on("error", function(error) {
                callback(error, null);
            });
        });
    },

    makeRequest = function (url, errmsg, key, callback) {
        if (!callback) {
            return;
        }
        getRequest(url, function (err, result) {
            if (err) {
                callback(new Error(errmsg + err));
            } else {
                if (key) {
                    callback(null, result[key]);
                } else {
                    callback(null, result);
                }
            }
        });
    },

    getValidSeasonParam = function (season) {
        return (season === null || season === 3 || season === 4);
    },

    getCallbackAndRegion = function (regionOrFunction, region, callback) {
        var regionAndFunction = {
            'region': region,
            'callback': callback
        };

        if (typeof (regionOrFunction) === 'function') {
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
    getRequest: getRequest,
    makeRequest: makeRequest,
    getValidSeasonParam: getValidSeasonParam,
    getCallbackAndRegion: getCallbackAndRegion,
    setRateLimit: setRateLimit
};