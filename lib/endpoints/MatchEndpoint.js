const Bluebird = require('bluebird');

const Endpoint = require('../Endpoint');

const util = require('../util');
const {ErrorUtil, ParameterUtil} = util;

/***
 * Endpoint to receive information about finished Match
 */
class MatchEndpoint extends Endpoint {

	constructor(config, rateLimiter) {
		super('Match', config, rateLimiter);
		this.apiUrl += `/match/${this.apiVersion}`;
	}

	/**
	 * Get match by match ID
	 * @param gameId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<MatchDto>}
	 */
	gettingById(gameId, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(gameId, 'gameId'))
			.then(() => this.executingRequest(`/matches/${gameId}`, platformIdOrRegion));
	}

	/**
	 * Get match timeline by match ID
	 * @param gameId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<MatchTimelineDto>}
	 */
	gettingTimelineById(gameId, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(gameId, 'gameId'))
			.then(() => this.executingRequest(`/timelines/by-match/${gameId}`, platformIdOrRegion));
	}

	/**
	 * Get matchlist for ranked games played on given account ID and platform ID
	 * and filtered using given filter parameters, if any.
	 * @param accountId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 *
	 * @param options
	 * @param options.queue {number[]} Set of queue IDs for which to filtering matchlist.
	 * @param options.season {number[]} Set of season IDs for which to filtering matchlist.
	 * @param options.champion {number[]} Set of champion IDs for which to filtering matchlist.
	 * @param options.beginTime {number} The begin time to use for filtering matchlist specified as epoch milliseconds.
	 * @param options.endTime {number} The end time to use for filtering matchlist specified as epoch milliseconds.
	 * @param options.beginIndex {number} The begin index (skip value) to use for filtering matchlist.
	 * @param options.endIndex {number} The end index to use for filtering matchlist.
	 *
	 * @return {Bluebird<MatchlistDto>}
	 */
	gettingListByAccount(accountId, platformIdOrRegion, options = {}) {
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(accountId, 'accountId'))
			.then(() => ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options))
			.then(({_platformId, _options}) => this.executingRequest(`/matchlists/by-account/${accountId}`, _platformId, _options));
	}

	/**
	 * Get matchlist for last 20 matches played on given account ID and platform ID.
	 * @param accountId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<MatchlistDto>}
	 */
	gettingRecentListByAccount(accountId, platformIdOrRegion = this.config.PLATFORM_ID) {
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotNumerical(accountId, 'accountId'))
			.then(() => this.executingRequest(`/matchlists/by-account/${accountId}/recent`, platformIdOrRegion));
	}

	/**
	 * Get match IDs by tournament code.
	 * NOTE: API-key needs to be a tournament API-KEY
	 * @param tournamentCode
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<number[]>}
	 */
	gettingIdsByTournament(tournamentCode, platformIdOrRegion = this.config.PLATFORM_ID) { // TODO: unit tests!?
		return Bluebird.resolve()
			.then(() => ErrorUtil.throwIfNotString(tournamentCode, 'tournamentCode'))
			.then(() => this.executingRequest(`/matches/by-tournament-code/${tournamentCode}`, platformIdOrRegion));
	}

	/**
	 * Get match by match ID and tournament code.
	 * @param gameId
	 * @param tournamentCode
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<MatchDto>}
	 */
	gettingByIdForTournament(gameId, tournamentCode, platformIdOrRegion = this.config.PLATFORM_ID) { // TODO: unit tests!?
		return Bluebird.resolve()
			.then(() => Bluebird.all([ErrorUtil.throwIfNotNumerical(gameId, 'gameId'), ErrorUtil.throwIfNotString(tournamentCode, 'tournamentCode')]))
			.then(() => this.executingRequest(`/matches/${gameId}/by-tournament-code/${tournamentCode}`, platformIdOrRegion));
	}
}

module.exports = MatchEndpoint;