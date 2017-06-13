const deepmerge = require('deepmerge');

const RegionAndPlatformUtil = require('./util/RegionAndPlatformUtil');

const RateLimiter = require('./RateLimiter');

class LeagueUtil {
	// TODO: maybe split into more specific classes instead of "Util" class where everything gets dumped into

	static getConfig(options = {}) {
		return deepmerge(require('./config'), options);
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
		RegionAndPlatformUtil.getPlatformIds().forEach(platformId => {
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
		RegionAndPlatformUtil.getPlatformIds().forEach(platformId => {
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