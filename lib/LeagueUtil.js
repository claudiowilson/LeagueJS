const deepmerge = require('deepmerge');
const fs = require('fs');
const path = require('path');

const ParameterError = require('./errors/ParameterError');

const RateLimiter = require('./RateLimiter');

class LeagueUtil { // TODO: move useful things from util.js here
	// TODO: maybe split into more specific classes instead of "Util" class
	static normalizeSummonerName(name) {
		return name.toLowerCase().replace(/ /g, '');
	}

	/**
	 * @return null if the name is valid, else the matching characters that are invalid*/
	static validateSummonerNameInputCharacters(name) { // TODO: add platformID based character validation
		// validating only allowed characters
		//  https://developer.riotgames.com/getting-started.html
		// regexp matches all unicode and ASCII letters and allowed other chars (space, dot and underscore)
		// needs testing for the unicode characters

		// NA/OCE:
		// 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
		// EUW:
		// 	0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzªµºÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĄąĆćĘęıŁłŃńŒœŚśŠšŸŹźŻżŽžƒˆˇˉμﬁﬂ
		// EUNE:
		// 	0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzªµºÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĂăĄąĆćĘęıŁłŃńŐőŒœŚśŞşŠšŢţŰűŸŹźŻżŽžƒȘșȚțˆˇˉΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩάέήίαβγδεζηθικλμνξοπρςστυφχψωόύώﬁﬂ
		// Brazil:
		// 	0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÇÉÊÍÓÔÕÚàáâãçéêíóôõú
		// Russia:
		// 	0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя
		// Turkey:
		// 	ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïð 0123456789ABCDEFGĞHIİJKLMNOPQRSŞTUVWXYZabcçdefgğhıijklmnoöpqrsştuvwxyzªµºÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿıŁłŒœŠšŸŽžƒˆˇˉμﬁﬂĄąĘęÓóĆćŁłŃńŚśŹźŻż
		// LATAM:
		// 	0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜ abcdefghijklmnñopqrstuvwxyzáéíóúü

		return name.match(/[^\d\u00BF-\u1FFF\u2C00-\uD7FF\w _\.]+/g);
	}

	static validateSummonerNameInputLength(name) {
		return name.length <= 16;
	}

	static validatePlatformId(_platformId) {
		let isValid = false;
		if (_platformId && typeof _platformId === 'string') {
			isValid = typeof LeagueUtil.getPlatformIds().find(platformId => {
					return platformId === _platformId.toLowerCase();
				}) !== 'undefined';
		}
		return isValid;
	}

	static getPlatformIdForRegion(region) {
		const mapping = LeagueUtil.getMappingRegionToPlatformId();
		if (!region) {
			throw new ParameterError('region is missing');
		}
		const platformId = mapping[region.toLowerCase()];

		if (!platformId) {
			throw new Error(`No platformId available for given region "${region}"`);
		} else {
			return platformId;
		}
	}

	static getPlatformIds() {
		const mapping = LeagueUtil.getMappingRegionToPlatformId();
		return Object.keys(mapping).map(region => {
			return mapping[region];
		});
	}

	static getRegions() {
		return Object.keys(LeagueUtil.getMappingRegionToPlatformId());
	}

	static getMappingRegionToPlatformId() {
		return {
			'na': 'na1',
			'euw': 'euw1',
			'eune': 'eun1',
			'lan': 'la1',
			'las': 'la2',
			'oce': 'oc1',
			'tr': 'tr1',
			'ru': 'ru',
			'br': 'br1',
			'kr': 'kr',
			'jp': 'jp1'
		};
	}

	/**
	 *
	 * @param {string} gameVersion Versioning string from MatchDto.gameVersion
	 * @param {string[]} versions Array with valid ddragon version {@link StaticDataEndpoint.gettingVersions}
	 * @return {string} The data dragon version correlating to the gameVersion
	 */
	static getVersionForGameVersion(gameVersion, versions) {
		let indexFirstDot = gameVersion.indexOf('.');
		let indexSecondDot = gameVersion.substr(indexFirstDot + 1).indexOf('.') + indexFirstDot + 1;
		let gameVersionMajorMinor = gameVersion.substr(0, indexSecondDot);

		const ddVersion = versions.find(version => {
			return version.indexOf(gameVersionMajorMinor) === 0;
		});

		if (ddVersion === null) {
			throw new Error('LeagueUtil.getDdragonVersionForMatchVersion(): no ddragon Version found from gameVersion: ' + gameVersionMajorMinor);
		} else {
			console.log('LeagueUtil.getDdragonVersionForMatchVersion() version is resolved: ' + ddVersion + ' gameVersion: ' + gameVersion + ' majorMinor: ' + gameVersionMajorMinor);
			return ddVersion;
		}
	}

	static getConfig(options = {}) {
		return deepmerge(require('./config'), options);
	}

	/** Returns names of all implemented Endpoints */
	static getEndpointNames(){
		let endpointPath = path.resolve(__dirname + '/endpoints');
		console.log(endpointPath);
		let filenames = fs.readdirSync(endpointPath);
		return filenames.map(filename => filename.replace('Endpoint.js',''));
	}

	/**
	 * creates a RateLimiter per limit and region to be passed to Endpoints
	 * @param limitPer10
	 * @param limitPer600
	 * @param allowBursts
	 * @return {{per10: {RateLimiter[]}, per600: {RateLimiter[]}}}
	 */
	static createRateLimiter(limitPer10, limitPer600, allowBursts) {
		let rateLimiter = {
			per10: {},
			per600: {}
		};
		LeagueUtil.getPlatformIds().forEach(platformId => {
			rateLimiter.per10[platformId] =
				new RateLimiter(limitPer10, 10 * 1000, allowBursts);
			rateLimiter.per600[platformId] =
				new RateLimiter(limitPer600, 600 * 1000, allowBursts);
		});
		return rateLimiter;
	}

	// TODO: methods to get GameConstants comfortably
// 	League.getRegions = function (callback) {
// 	var regions = {
// 		'na': 'North America',
// 		'euw': 'Europe West',
// 		'eune': 'Europe Nordic and East'
// 	};
// 	return util.makeStaticRequest(error, regions);
// };
//
// 	League.getQueues = function (callback) {
// 	var queues = {
// 		2: 'Normal 5v5 Blind Pick',
// 		4: 'Ranked Solo 5v5',
// 		7: 'Coop vs AI 5v5',
// 		8: 'Normal 3v3',
// 		14: 'Normal 5v5 Draft Pick',
// 		16: 'Dominion 5v5 Blind Pick',
// 		17: 'Dominion 5v5 Draft Pick',
// 		25: 'Dominion Coop vs AI',
// 		41: 'Ranked Team 3v3',
// 		42: 'Ranked Team 5v5',
// 		52: 'Twisted Treeline Coop vs AI',
// 		65: 'ARAM',
// 		67: 'ARAM Coop vs AI'
// 	};
// 	return util.makeStaticRequest(null, queues);
// };
//
// 	League.getMapNames = function (callback) {
// 	var maps ={
// 		1: 'Summoner\'s Rift Summer Variant ',
// 		2: 'Summoner\'s Rift Autumn Variant',
// 		3: 'The Proving Grounds',
// 		4: 'Twisted Treeline Original Version',
// 		8: 'The Crystal Scar',
// 		10: 'Twisted Treeline Current Version',
// 		12: 'Howling Abyss'
// 	};
// 	return util.makeStaticRequest(null, maps);
// };
}
module.exports = LeagueUtil;