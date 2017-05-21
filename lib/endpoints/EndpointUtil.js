const ParameterError = require('../errors/ParameterError');
const LeagueUtil = require('../LeagueUtil');

class EndpointUtil {

	static throwIfParamIsArray(param, paramName){
		if(param instanceof Array) {
			throw new ParameterError(`${paramName} can not be an Array.`);
		}
	}

	static buildQueryStringFromOptions(options){
		let paramsArray = Object.keys(options).map(optionKey => {
			const option = options[optionKey];

			if(Array.isArray(option)) {
				return option.map(v => {
					return `${optionKey}=${v}`;
				}).join('&');
			} else {
				return `${optionKey}=${option}`;
			}
		});
		return paramsArray.join('&');
	}

	static throwIfNameIsInvalid(name){
		if (!LeagueUtil.validateSummonerNameInputLength(name)){
			throw new Error(`Summoner name "${name}" is too long (16 characters max, found ${name.length})`);
		}
		const invalidCharactersMatch = LeagueUtil.validateSummonerNameInputCharacters(name);
		if (invalidCharactersMatch){
			throw new Error(`Summoner name "${name}" contains invalid characters: ${invalidCharactersMatch.join(' | ')}`);
		}
	}
}

module.exports = EndpointUtil;