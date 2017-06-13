const Endpoint = require('../Endpoint');
const EndpointUtil = require('../util/EndpointUtil');
const ParameterUtil = require('../util/ParameterUtil');
const ErrorUtil = require('../util/ErrorUtil');

// const ParameterError = require('../errors/ParameterError');

/***
 * Endpoint to receive Data from the Data dragon service
 */
class StaticDataEndpoint extends Endpoint {

	constructor(config) {
		super('StaticData', config);
		this.apiUrl += `/static-data/${this.apiVersion}`;
	}


	/**
	 * Retrieves champion list.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, key, name, and title are returned by default
	 * if this parameter isn't specified.</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>allytips</li>
	 *     <li>blurb</li>
	 *     <li>enemytips</li>
	 *     <li>format</li>
	 *     <li>image</li>
	 *     <li>info</li>
	 *     <li>keys</li>
	 *     <li>lore</li>
	 *     <li>partype</li>
	 *     <li>passive</li>
	 *     <li>recommended</li>
	 *     <li>skins</li>
	 *     <li>spells</li>
	 *     <li>stats</li>
	 *     <li>tags</li>
	 * </ul>
	 *
	 * @param {boolean} options.dataById
	 * <p>If specified as true, the returned data map will use the champions' IDs as the keys.</p>
	 * <p> If not specified or specified as false, the returned data map will use the champions' keys instead.</p>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ChampionListDto>}
	 */
	gettingChampions(platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/champions`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 *
	 * Retrieves champion by ID.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 * @param championId
	 *
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only id, key, name, and title are returned by default
	 * if this parameter isn't specified.</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>allytips</li>
	 *     <li>blurb</li>
	 *     <li>enemytips</li>
	 *     <li>format</li>
	 *     <li>image</li>
	 *     <li>info</li>
	 *     <li>keys</li>
	 *     <li>lore</li>
	 *     <li>partype</li>
	 *     <li>passive</li>
	 *     <li>recommended</li>
	 *     <li>skins</li>
	 *     <li>spells</li>
	 *     <li>stats</li>
	 *     <li>tags</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ChampionDto>}
	 */
	gettingChampionById(championId, platformIdOrRegion, options = {}) {
		ErrorUtil.throwIfNotNumerical(championId, 'championId');
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/champions/${championId}`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Retrieves item list.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 *
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, name, plaintext, and description are returned by default
	 * if this parameter isn't specified.</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>colloq</li>
	 *     <li>consumeOnFull</li>
	 *     <li>consumed</li>
	 *     <li>depth</li>
	 *     <li>effect</li>
	 *     <li>from</li>
	 *     <li>gold</li>
	 *     <li>groups</li>
	 *     <li>hideFromAll</li>
	 *     <li>image</li>
	 *     <li>inStore</li>
	 *     <li>into</li>
	 *     <li>maps</li>
	 *     <li>requiredChampion</li>
	 *     <li>sanitizedDescription</li>
	 *     <li>specialRecipe</li>
	 *     <li>stacks</li>
	 *     <li>stats</li>
	 *     <li>tags</li>
	 *     <li>tree</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ItemListDto>}
	 */
	gettingItems(platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/items`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Retrieves item by ID.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 *
	 * @param {number} itemId
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, name, description, plaintext, and ~group~ are returned by default
	 * if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>colloq</li>
	 *     <li>consumeOnFull</li>
	 *     <li>consumed</li>
	 *     <li>depth</li>
	 *     <li>effect</li>
	 *     <li>from</li>
	 *     <li>gold</li>
	 *     <li>groups</li>
	 *     <li>hideFromAll</li>
	 *     <li>image</li>
	 *     <li>inStore</li>
	 *     <li>into</li>
	 *     <li>maps</li>
	 *     <li>requiredChampion</li>
	 *     <li>sanitizedDescription</li>
	 *     <li>specialRecipe</li>
	 *     <li>stacks</li>
	 *     <li>stats</li>
	 *     <li>tags</li>
	 *     <li>tree</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ItemDto>}
	 */
	gettingItemById(itemId, platformIdOrRegion, options = {}) {
		ErrorUtil.throwIfNotNumerical(itemId, 'itemId');
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/items/${itemId}`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Retrieve language strings data
	 * This means Language parts as in stats for example.
	 * Useful for example to generate stat-string as in
	 *    "rFlatMPRegenModPerLevel": "Mana Regen / 5 at level 18"
	 *
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 *
	 * @param options
	 * @param {string} options.version Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<LanguageStringsDto>}
	 */
	gettingLanguageStrings(platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/language-strings`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Retrieve supported languages data.
	 * (locale-strings supported for the given region)
	 *
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<string[]>}
	 */
	gettingLanguages(platformIdOrRegion = this.config.PLATFORM_ID) {
		return this.executingRequest(`/languages`, platformIdOrRegion);
	}

	/**
	 * Retrieve map data.
	 *
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 *
	 * @param options
	 * @param {string} options.version Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 *
	 * @return {Bluebird<MapDataDto>}
	 */
	gettingMaps(platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/maps`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}


	/**
	 * Retrieves champion list.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, key, name, and title are returned by default
	 * if this parameter isn't specified.</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>image</li>
	 *     <li>masteryTree</li>
	 *     <li>prereq</li>
	 *     <li>ranks</li>
	 *     <li>sanitizedDescription</li>
	 *     <li>tree</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<MasteryListDto>}
	 */
	gettingMasteries(platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/masteries`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}


	/**
	 * Retrieves champion list.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 * @param {number} masteryId
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only id, key, name, and title are returned by default
	 * if this parameter isn't specified.</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>image</li>
	 *     <li>masteryTree</li>
	 *     <li>prereq</li>
	 *     <li>ranks</li>
	 *     <li>sanitizedDescription</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param {string} platformIdOrRegion
	 * @return {Bluebird<MasteryDto>}
	 */
	gettingMasteryById(masteryId, platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/masteries/${masteryId}`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Retrieve profile icons.
	 *
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 *
	 * @param options
	 * @param {string} options.version Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ProfileIconDataDto>}
	 */
	gettingProfileIcons(platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/profile-icons`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}


	/**
	 * Retrieve realm data.
	 *
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ProfileIconDataDto>}
	 */
	gettingRealms(platformIdOrRegion = this.config.PLATFORM_ID) {
		return this.executingRequest(`/realms`, platformIdOrRegion);
	}

	/**
	 * Retrieves rune list.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, name, rune, and description
	 * are returned by default if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>image</li>
	 *     <li>sanitizedDescription</li>
	 *     <li>stats</li>
	 *     <li>tags</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<RuneListDto>}
	 */
	gettingRunes(platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/runes`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Retrieves rune by ID.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 * @param runeId
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only id, name, rune, and description
	 * are returned by default if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>image</li>
	 *     <li>sanitizedDescription</li>
	 *     <li>stats</li>
	 *     <li>tags</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<RuneDto>}
	 */
	gettingRunesById(runeId, platformIdOrRegion, options = {}) {
		ErrorUtil.throwIfNotNumerical(runeId);
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/runes/${runeId}`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}


	/**
	 * Retrieves rune list.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 * @param options
	 *
	 * @param options.dataById <p>If specified as true, the returned data map will use the spells' IDs as the keys.
	 * If not specified or specified as false, the returned data map will use the spells' keys instead.</p>
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, key, name, description, and summonerLevel
	 * are returned by default if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values: // TODO: 2017/06/02 check again on reference page if something changed here (tags were not populated)
	 * <ul>
	 *     <li>all</li>
	 *     <li>cooldown</li>
	 *     <li>cooldownBurn</li>
	 *     <li>cost</li>
	 *     <li>costBurn</li>
	 *     <li>costType</li>
	 *     <li>effect</li>
	 *     <li>effectBurn</li>
	 *     <li>image</li>
	 *     <li>key</li>
	 *     <li>leveltip</li>
	 *     <li>maxrank</li>
	 *     <li>modes</li>
	 *     <li>range</li>
	 *     <li>rangeBurn</li>
	 *     <li>resource</li>
	 *     <li>sanitizedDescription</li>
	 *     <li>sanitizedTooltip</li>
	 *     <li>tooltip</li>
	 *     <li>vars</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<SummonerSpellListDto>}
	 */
	gettingSummonerSpells(platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/summoner-spells`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Retrieves rune list.
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 * IMPLEMENTATION NOTES
	 * Data returned is dependent on given options. See options params for details.
	 *
	 * @param summonerSpellId
	 * @param options
	 *
	 * @param {string} options.version  Data dragon version for returned data.
	 * <p>If not specified, the latest version for the region is used.</p>
	 * <p>List of valid versions can be obtained from the {@link StaticDataEndpoint.gettingVersions} endpoint.</p>
	 * <p>Data dragon version for a specific {@link MatchDto.gameVersion} received from MatchEndpoint
	 * can be obtained from {@link MatchUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.tags Tags to return additional data.
	 *
	 * <p>Only id, key, name, description, and summonerLevel
	 * are returned by default if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values: // TODO: 2017/06/02 check again on reference page if something changed here (tags were not populated)
	 * <ul>
	 *     <li>all</li>
	 *     <li>cooldown</li>
	 *     <li>cooldownBurn</li>
	 *     <li>cost</li>
	 *     <li>costBurn</li>
	 *     <li>costType</li>
	 *     <li>effect</li>
	 *     <li>effectBurn</li>
	 *     <li>image</li>
	 *     <li>key</li>
	 *     <li>leveltip</li>
	 *     <li>maxrank</li>
	 *     <li>modes</li>
	 *     <li>range</li>
	 *     <li>rangeBurn</li>
	 *     <li>resource</li>
	 *     <li>sanitizedDescription</li>
	 *     <li>sanitizedTooltip</li>
	 *     <li>tooltip</li>
	 *     <li>vars</li>
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<SummonerSpellDto>}
	 */
	gettingSummonerSpellsById(summonerSpellId, platformIdOrRegion, options = {}) {
		const {_platformId, _options} = ParameterUtil.extractPlatformIdAndOptions(platformIdOrRegion, options);
		return this.executingRequest(`/summoner-spells/${summonerSpellId}`, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Retrieve version data.
	 * Contains all valid data dragon version strings
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<string[]>}
	 */
	gettingVersions(platformIdOrRegion = this.config.PLATFORM_ID) {
		return this.executingRequest(`/versions`, platformIdOrRegion);
	}
}

module.exports = StaticDataEndpoint;