const ParameterError = require('./errors/ParameterError');
const LeagueUtil = require('./LeagueUtil');
const RateLimiter = require('./RateLimiter');

class EndpointUtil {

	static buildQueryStringFromOptions(options) {
		let paramsArray = Object.keys(options).map(optionKey => {
			const option = options[optionKey];

			if (Array.isArray(option)) {
				return option.map(v => {
					return `${optionKey}=${v}`;
				}).join('&');
			} else {
				return `${optionKey}=${option}`;
			}
		});
		return paramsArray.join('&');
	}

	static throwIfParamIsArray(param, paramName) {
		if (param instanceof Array) {
			throw new ParameterError(`${paramName} can not be an Array. Received: ${param}`);
		}
	}

	static throwIfNotNumerical(param, paramName) {
		if (isNaN(parseInt(param))) {
			throw new TypeError(`${paramName} has to be a number or numerical string. Received: ${param}`);
		}
	}

	static throwIfInvalidPlatformId(platformId) {
		if (!LeagueUtil.validatePlatformId(platformId)) {
			throw new ParameterError(`${platformId} is not a valid platformId`);
		}
	}

	static throwIfNotBoolean(param, paramName) {
		const isBooleanString = typeof param === 'string' && (param === 'true' || param === 'false');
		const isBoolean = param === true || param === false;
		if (!(isBoolean || isBooleanString)) {
			throw new TypeError(`${paramName} has to be a boolean or booleanlike string (true,false,'true','false'). Received: ${param}`);
		}
	}
	static throwIfNameIsInvalid(name) {
		if (!LeagueUtil.validateSummonerNameInputLength(name)) {
			throw new Error(`Summoner name "${name}" is too long (16 characters max, found ${name.length})`);
		}
		const invalidCharactersMatch = LeagueUtil.validateSummonerNameInputCharacters(name);
		if (invalidCharactersMatch) {
			throw new Error(`Summoner name "${name}" contains invalid characters: ${invalidCharactersMatch.join(' | ')}`);
		}
	}

	static throwIfRankedQueueConfigIdInvalid(rankedQueueConfigId) {
		const validRankedQueueConfigIds = ['RANKED_SOLO_5x5', 'RANKED_FLEX_TT', 'RANKED_FLEX_SR'];
		if (validRankedQueueConfigIds.indexOf(rankedQueueConfigId) === -1) {
			throw new ParameterError(`rankedQueueConfigId has to be one of ${validRankedQueueConfigIds}. Received: ${rankedQueueConfigId}`);
		}
	}

	static throwIfNotObject(param, paramName) {
		if (typeof param === 'function' || typeof param !== 'object') {
			throw new TypeError(`${paramName} needs to be an object. Received: ${param}`);
		}
	}

	static throwIfNotRateLimiter(param, name) {
		if (
			!(param.per10 && param.per600) ||
			!(param.per10.na1 instanceof RateLimiter && param.per600.na1 instanceof RateLimiter)
		) {
			throw new TypeError(`${name} needs to be a collection of RateLimiter instances. Received: ${param}`);
		}
	}

}

module.exports = EndpointUtil;