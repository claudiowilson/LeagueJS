const config = require('./config');
const deepmerge = require('deepmerge');

const ParameterError = require('./errors/ParameterError');

class LeagueUtil { // TODO: move useful things from util.js here
	// TODO: maybe split into more specific classes instead of "Util" class
	static normalizeSummonerName(name){
		return name.toLowerCase().replace(/ /g, '');
	}
	/**
	 * @return null if the name is valid, else the matching characters that are invalid*/
	static validateSummonerNameInputCharacters(name){ // TODO: add platformID based character validation
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
	static validateSummonerNameInputLength(name){
		return name.length <= 16;
	}

	static validatePlatformId(_platformId){
		let isValid = false;
		if (_platformId && typeof _platformId === 'string'){
			isValid = typeof LeagueUtil.getPlatformIds().find(platformId => {
				return platformId === _platformId.toLowerCase();
			}) !== 'undefined';
		}
		return isValid;
	}

	static getPlatformIdForRegion(region){
		const mapping = LeagueUtil.getMappingRegionToPlatformId();
		if(!region){
			throw new ParameterError('region is missing');
		}
		const platformId = mapping[region.toLowerCase()];

		if (!platformId){
			throw new Error(`No platformId available for given region "${region}"`);
		} else {
			return platformId;
		}
	}
	static getPlatformIds(){
		const mapping = LeagueUtil.getMappingRegionToPlatformId();
		return Object.keys(mapping).map(region => {
			return mapping[region];
		});
	}

	static getRegions(){
		return Object.keys(LeagueUtil.getMappingRegionToPlatformId());
	}

	static getMappingRegionToPlatformId(){
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

	static getConfig(options = {}){
		return deepmerge(config, options);
	}
}
module.exports = LeagueUtil;