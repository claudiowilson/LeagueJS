/*global require*/
/*global exports*/
/*jslint nomen: true*/
'use strict';

var http = require('http'),

    craftUrl = function (urlType, region, api, authKey) {
        return urlType + '/' + region + api + 'api_key=' + authKey;
    },

    getRequest = function (path, callback) {
        var jsonObj = '';

        http.get(path, function (response) {
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
                    callback(jsonObj.status.message, null);
                } else {
                    callback(null, jsonObj);
                }
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
    };

module.exports = {
    craftUrl: craftUrl,
    getRequest: getRequest,
    makeRequest: makeRequest,
    getValidSeasonParam: getValidSeasonParam,
    getCallbackAndRegion: getCallbackAndRegion
};