const RegionAndPlatformUtil = require('../util/RegionAndPlatformUtil');
/**
 * Util functionality to transform Parameters
 * @class
 */
class ParameterUtil {
	/**
	 * Takes the platformIdOrRegion and options argument and sets them acchording to their data type.
	 *
	 * */
	static extractPlatformIdAndOptions(platformIdOrRegion, options) {
		let _platformId;
		let _options = options;

		if (options && typeof options !== 'object' || Array.isArray(options)  ){ // falsy values are fine too
			throw new TypeError(`options needs to be an object or falsy if specified, received: ${typeof options} | ${options}`);
		}

		if (!platformIdOrRegion){
			// making sure falsy values do not prevent the default to be set later on
			_platformId = undefined;
		} else if (typeof platformIdOrRegion === 'object'){
			// only options given
			_options = platformIdOrRegion;
		} else if (typeof platformIdOrRegion === 'string'){
			_platformId = RegionAndPlatformUtil.getPlatformIdFromPlatformIdOrRegion(platformIdOrRegion);
		}

		return {_platformId, _options};
	}
}
module.exports = ParameterUtil;