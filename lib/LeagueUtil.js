const deepmerge = require('deepmerge');
const fs = require('fs');
const path = require('path');

const ParameterError = require('./errors/ParameterError');

const RateLimiter = require('./RateLimiter');

class LeagueUtil {
	// TODO: maybe split into more specific classes instead of "Util" class where everything gets dumped into
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
			isValid = LeagueUtil.getPlatformIds().indexOf(_platformId.toLowerCase()) !== -1;
		}
		return isValid;
	}

	static validateRegion(_region) {
		let isValid = false;
		if (_region && typeof _region === 'string') {
			isValid = LeagueUtil.getRegions().indexOf(_region.toLowerCase()) !== -1;
		}
		return isValid;
	}

	static getPlatformIdForRegion(region) {
		const mapping = LeagueUtil.getMappingRegionToPlatformId();
		if (!region || typeof region !== 'string') {
			throw new ParameterError('region is missing');
		}
		const regionLower = region.toLowerCase();
		const platformId = mapping[regionLower];

		if (!platformId) {
			throw new Error(`No platformId available for given region "${region}"`);
		} else {
			return platformId;
		}
	}

	static getRegionForPlatformId(platformId) {
		const mapping = LeagueUtil.getMappingRegionToPlatformId();
		if (!platformId || typeof platformId !== 'string') {
			throw new ParameterError('platformId is missing');
		}
		const platformIdLower = platformId.toLowerCase();
		const region = Object.keys(mapping).find(region => {
			return mapping[region] === platformIdLower;
		});

		if (!region) {
			throw new Error(`No region available for given platformId "${platformId}"`);
		} else {
			return region;
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
			throw new Error(`LeagueUtil.getDdragonVersionForMatchVersion(): no ddragon Version found from gameVersion: ${gameVersionMajorMinor}`);
		} else {
			console.log(`LeagueUtil.getDdragonVersionForMatchVersion() version is resolved: ${ddVersion} gameVersion: ${gameVersion} majorMinor: ${gameVersionMajorMinor}`);
			return ddVersion;
		}
	}

	static getConfig(options = {}) {
		return deepmerge(require('./config'), options);
	}

	/** Returns names of all implemented Endpoints */
	static getEndpointNames() {
		let endpointPath = path.resolve(__dirname + '/endpoints');
		console.log(endpointPath);
		let filenames = fs.readdirSync(endpointPath);
		return filenames.map(filename => filename.replace('Endpoint.js', ''));
	}

	/**
	 * creates a RateLimiter per limit and region to be passed to Endpoints
	 * @param limitPer10
	 * @param limitPer600
	 * @param allowBursts
	 * @return {{per10: {platformId: RateLimiter}, per600: {platformId: RateLimiter}}}
	 */
	static createRateLimiter(limitPer10, limitPer600, allowBursts) {
		let rateLimiter = {
			per10: {},
			per600: {},
			limits: {
				per10: limitPer10,
				per600: limitPer600,
				allowBursts
			}
		};
		LeagueUtil.getPlatformIds().forEach(platformId => {
			rateLimiter.per10[platformId] =
				new RateLimiter(limitPer10, 10 * 1000, allowBursts);
			rateLimiter.per600[platformId] =
				new RateLimiter(limitPer600, 600 * 1000, allowBursts);
		});
		return rateLimiter;
	}

	/**
	 * creates a RateLimiter per limit and region to be passed to Endpoints
	 * @param {{per10:object, per600: object}} rateLimiter the ratelimiter to overwrite.
	 * NOTE that the rate-limiter reference for per10 and per600 will not be changed,
	 * thus the rate-limiting changes should propagate through all the Endpoints.
	 *
	 * @param limitPer10
	 * @param limitPer600
	 * @param allowBursts
	 * @return {{per10: {platformId: RateLimiter}, per600: {platformId: RateLimiter}}}
	 * same reference as passed in with new RateLimiter objects on the new settings per platformId
	 */
	static updateRateLimiter(rateLimiter, limitPer10, limitPer600, allowBursts) {
		rateLimiter.limits = {
			per10: limitPer10,
			per600: limitPer600,
			allowBursts
		};
		LeagueUtil.getPlatformIds().forEach(platformId => {
			rateLimiter.per10[platformId] =
				new RateLimiter(limitPer10, 10 * 1000, allowBursts);
			rateLimiter.per600[platformId] =
				new RateLimiter(limitPer600, 600 * 1000, allowBursts);
		});
		return rateLimiter;
	}

	/**
	 * Removes spaces and special characters.
	 * For certain Champions it returns set keys.
	 * Useful in special cases when reading champions from logs for Example.
	 * @param name
	 * @return string
	 */
	static getChampionKeyFromName(name) {
		let key = name;

		// strip out all non-alphanumeric characters + whitespace
		key = key.replace(/[^A-Za-z0-9]/g, '');

		// special names that don't follow the universal rule (yet!? - watch test-result to see if it changes)
		switch (name) {
			case 'Kha\'Zix':
				key = 'Khazix';
				break;
			case 'Cho\'Gath':
				key = 'Chogath';
				break;
			case 'Vel\'Koz':
				key = 'Velkoz';
				break;
			case 'Wukong':
				key = 'MonkeyKing';
				break;
			case 'LeBlanc':
				key = 'Leblanc';
				break;

		}
		return key;
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