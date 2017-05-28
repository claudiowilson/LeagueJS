const Endpoint = require('../Endpoint');
const EndpointUtil = require('../EndpointUtil');

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
	 * @param platformId
	 * @return {Bluebird<MatchDto>}
	 */
	gettingById(gameId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(gameId, 'gameId');
		return this.executingRequest(`/matches/${gameId}`, platformId);
	}

	/**
	 * Get match timeline by match ID
	 * @param gameId
	 * @param platformId
	 * @return {Bluebird<MatchTimelineDto>}
	 */
	gettingTimelineById(gameId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(gameId, 'gameId');
		return this.executingRequest(`/timelines/by-match/${gameId}`, platformId);
	}

	/**
	 * Get matchlist for ranked games played on given account ID and platform ID
	 * and filtered using given filter parameters, if any.
	 * @param accountId
	 * @param platformId
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
	gettingListByAccount(accountId, options, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(accountId, 'accountId');
		EndpointUtil.throwIfNotObject(options, 'options');
		return this.executingRequest(`/matchlists/by-account/${accountId}`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
	}

	/**
	 * Get matchlist for last 20 matches played on given account ID and platform ID.
	 * @param accountId
	 * @param platformId
	 * @return {Bluebird<MatchlistDto>}
	 */
	gettingRecentListByAccount(accountId, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(accountId, 'accountId');
		return this.executingRequest(`/matchlists/by-account/${accountId}/recent`, platformId);
	}

	/**
	 * Get match IDs by tournament code.
	 * NOTE: API-key needs to be a tournament API-KEY
	 * @param tournamentCode
	 * @param platformId
	 * @return {Bluebird<number[]>}
	 */
	gettingIdsByTournament(tournamentCode, platformId = this.config.PLATFORM_ID) { // TODO: unit tests!?
		if(typeof tournamentCode !== 'string'){
			throw new TypeError(`tournamentCode should be a string. Received: ${tournamentCode}`);
		}
		return this.executingRequest(`/matches/by-tournament-code/${tournamentCode}`, platformId);
	}

	/**
	 * Get match by match ID and tournament code.
	 * @param gameId
	 * @param tournamentCode
	 * @param platformId
	 * @return {Bluebird<MatchDto>}
	 */
	gettingByIdForTournament(gameId, tournamentCode, platformId = this.config.PLATFORM_ID) { // TODO: unit tests!?
		EndpointUtil.throwIfNotNumerical(gameId, 'gameId');
		if(typeof tournamentCode !== 'string'){
			throw new TypeError(`tournamentCode should be a string. Received: ${tournamentCode}`);
		}
		return this.executingRequest(`/matches/${gameId}/by-tournament-code/${tournamentCode}`, platformId);
	}




}

module.exports = MatchEndpoint;