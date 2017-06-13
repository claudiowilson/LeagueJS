const RateLimiter = require('./RateLimiter');

// explicit bc of use in constructor
const RegionAndPlatformUtil = require('../util/RegionAndPlatformUtil');

class LeagueJSRateLimiter { // TODO: unit tests

	/**
	 * creates a RateLimiter per limit and region to be passed to Endpoints
	 * @param limitPer10
	 * @param limitPer600
	 * @param allowBursts
	 * @return {{per10: {platformId: RateLimiter}, per600: {platformId: RateLimiter, limits: {per10, per600, allowBursts}}}}
	 */
	constructor(limitPer10, limitPer600, allowBursts) {
		this.per10 = {};
		this.per600 = {};
		this.limits = {
			per10: limitPer10,
			per600: limitPer600,
			allowBursts
		};
		RegionAndPlatformUtil.getPlatformIds().forEach(platformId => {
			this.per10[platformId] =
				new RateLimiter(limitPer10, 10 * 1000, allowBursts);
			this.per600[platformId] =
				new RateLimiter(limitPer600, 600 * 1000, allowBursts);
		});
	}

	/**     *
	 * @param limitPer10
	 * @param limitPer600
	 * @param allowBursts
	 */
	update(limitPer10, limitPer600, allowBursts) {
		this.limits = {
			per10: limitPer10,
			per600: limitPer600,
			allowBursts
		};
		RegionAndPlatformUtil.getPlatformIds().forEach(platformId => {
			this.per10[platformId] =
				new RateLimiter(limitPer10, 10 * 1000, allowBursts);
			this.per600[platformId] =
				new RateLimiter(limitPer600, 600 * 1000, allowBursts);
		});
	}

	scheduling(platformId, fn) {
		return this.per10[platformId].scheduling(
			() => this.per600[platformId].scheduling(
				() => fn()
			)
		);
	}
}
module.exports = LeagueJSRateLimiter;