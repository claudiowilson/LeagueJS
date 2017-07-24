class MatchUtil {
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
			return version.indexOf(gameVersionMajorMinor + '.') === 0;
		});

		if (ddVersion === null) {
			throw new Error(`MatchUtil.getVersionForGameVersion(): no ddragon Version found from gameVersion: ${gameVersionMajorMinor}`);
		} else {
			console.log(`MatchUtil.getVersionForGameVersion() version is resolved: ${ddVersion} gameVersion: ${gameVersion} majorMinor: ${gameVersionMajorMinor}`);
			return ddVersion;
		}
	}
}
module.exports = MatchUtil;