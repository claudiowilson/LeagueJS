const ParameterError = require('../errors/ParameterError');

class RegionAndPlatformUtil {

	static validatePlatformId(_platformId) {
		let isValid = false;
		if (_platformId && typeof _platformId === 'string') {
			isValid = RegionAndPlatformUtil.getPlatformIds().indexOf(_platformId.toLowerCase()) !== -1;
		}
		return isValid;
	}
	static validateRegion(_region) {
		let isValid = false;
		if (_region && typeof _region === 'string') {
			isValid = RegionAndPlatformUtil.getRegions().indexOf(_region.toLowerCase()) !== -1;
		}
		return isValid;
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
	static getPlatformIds() {
		const mapping = RegionAndPlatformUtil.getMappingRegionToPlatformId();
		return Object.keys(mapping).map(region => {
			return mapping[region];
		});
	}


	static getPlatformIdForRegion(region) {
		const mapping = RegionAndPlatformUtil.getMappingRegionToPlatformId();
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
	/**
	 * @throws Error if given argument is neither a valid platformId nor a valid region
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {string} platformId in lowercase
	 */
	static getPlatformIdFromPlatformIdOrRegion(platformIdOrRegion) {
		return RegionAndPlatformUtil.validatePlatformId(platformIdOrRegion) ? platformIdOrRegion.toLowerCase() : RegionAndPlatformUtil.getPlatformIdForRegion(platformIdOrRegion);
	}
	static getRegionForPlatformId(platformId) {
		const mapping = RegionAndPlatformUtil.getMappingRegionToPlatformId();
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
	static getRegions() {
		return Object.keys(RegionAndPlatformUtil.getMappingRegionToPlatformId());
	}
}
module.exports = RegionAndPlatformUtil;