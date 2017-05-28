const Endpoint = require('../Endpoint');
const EndpointUtil = require('../EndpointUtil');

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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.champListData Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, key, name, and title are returned by default
	 * if this parameter isn't specified.</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>allytips</li>
	 *     <li>altimages</li>
	 *     <li>blurb</li>
	 *     <li>enemytips</li>
	 *     <li>image</li>
	 *     <li>info</li>
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
	 * @param platformId
	 * @return {Bluebird<ChampionListDto>}
	 */
	gettingChampions(options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/champions`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p
	 *
	 * @param {string | string[]} options.champData Tags to return additional data.
	 *
	 * <p>Only id, key, name, and title are returned by default
	 * if this parameter isn't specified.</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
	 * <ul>
	 *     <li>all</li>
	 *     <li>allytips</li>
	 *     <li>altimages</li>
	 *     <li>blurb</li>
	 *     <li>enemytips</li>
	 *     <li>image</li>
	 *     <li>info</li>
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
	 * @param platformId
	 * @return {Bluebird<ChampionDto>}
	 */
	gettingChampionById(championId, options = {}, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(championId, 'championId');
		return this.executingRequest(`/champions/${championId}`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.itemListData Tags to return additional data.
	 *
	 * <p>Only type, version, basic, data, id, name, plaintext, and description are returned by default
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
	 * @param platformId
	 * @return {Bluebird<ItemListDto>}
	 */
	gettingItems(options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/items`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.itemData Tags to return additional data.
	 *
	 * <p>Only type, version, basic, data, id, name, plaintext, and description are returned by default
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
	 * @param platformId
	 * @return {Bluebird<ItemDto>}
	 */
	gettingItemById(itemId, options = {}, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(itemId, 'itemId');
		return this.executingRequest(`/items/${itemId}`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param platformId
	 * @return {Bluebird<LanguageStringsDto>}
	 */
	gettingLanguageStrings(options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/language-strings`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
	}

	/**
	 * Retrieve supported languages data.
	 * (locale-strings supported for the given region)
	 *
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 *
	 * @param platformId
	 * @return {Bluebird<string[]>}
	 */
	gettingLanguages(platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/languages`, platformId);
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param platformId
	 *
	 * @return {Bluebird<MapDataDto>}
	 */
	gettingMaps(options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/maps`, platformId);
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.masteryListData Tags to return additional data.
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
	 * @param platformId
	 * @return {Bluebird<MasteryListDto>}
	 */
	gettingMasteries(options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/masteries`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.masteryData Tags to return additional data.
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
	 * @param {string} platformId
	 * @return {Bluebird<MasteryDto>}
	 */
	gettingMasteryById(masteryId, options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/masteries/${masteryId}`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param platformId
	 * @return {Bluebird<ProfileIconDataDto>}
	 */
	gettingProfileIcons(options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/profile-icons`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
	}


	/**
	 * Retrieve realm data.
	 *
	 * RATE LIMIT NOTES
	 * Requests to this API are not counted against the application Rate Limits.
	 *
	 * @param platformId
	 * @return {Bluebird<ProfileIconDataDto>}
	 */
	gettingRealms(platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/realms`, platformId);
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.runeListData Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, name, rune, and description
	 * are returned by default if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values: // TODO: 2017/05/28 update valid values (seems like copy of items values and most are not relevant for runes)
	 * <ul>
	 *     <li>all</li>
	 *     <li>basic</li>
	 *     <li>colloq</li>
	 *     <li>consumeOnFull</li>
	 *     <li>consumed</li>
	 *     <li>depth</li>
	 *     <li>from</li>
	 *     <li>gold</li>
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
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param platformId
	 * @return {Bluebird<RuneListDto>}
	 */
	gettingRunes(options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/runes`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.runeData Tags to return additional data.
	 *
	 * <p>Only id, name, rune, and description
	 * are returned by default if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values: // TODO: 2017/05/28 update valid values (seems like copy of items values and most are not relevant for runes)
	 * <ul>
	 *     <li>all</li>
	 *     <li>colloq</li>
	 *     <li>consumeOnFull</li>
	 *     <li>consumed</li>
	 *     <li>depth</li>
	 *     <li>from</li>
	 *     <li>gold</li>
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
	 * </ul>
	 *
	 * @param {string} options.locale
	 * <p>Locale code for returned data (e.g., en_US, es_ES).
	 * If not specified, the default locale for the region is used.</p>
	 *
	 * @param platformId
	 * @return {Bluebird<RuneDto>}
	 */
	gettingRunesById(runeId, options = {}, platformId = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(runeId);
		return this.executingRequest(`/runes/${runeId}`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.spellListData Tags to return additional data.
	 *
	 * <p>Only type, version, data, id, key, name, description, and summonerLevel
	 * are returned by default if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
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
	 * @param platformId
	 * @return {Bluebird<SummonerSpellListDto>}
	 */
	gettingSummonerSpells(options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/summoner-spells`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
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
	 * can be obtained from {@link LeagueUtil#getVersionForGameVersion}</p>
	 *
	 * @param {string | string[]} options.spellData Tags to return additional data.
	 *
	 * <p>Only id, key, name, description, and summonerLevel
	 * are returned by default if this parameter isn't specified</p>
	 *
	 * <p><b>To return all additional data, use the tag 'all'.</b></p>
	 * valid values:
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
	 * @param platformId
	 * @return {Bluebird<SummonerSpellDto>}
	 */
	gettingSummonerSpellsById(summonerSpellId, options = {}, platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/summoner-spells/${summonerSpellId}`, platformId, EndpointUtil.buildQueryStringFromOptions(options));
	}

	/**
	 * Retrieve version data.
	 * Contains all valid data dragon version strings
	 * @param platformId
	 * @return {Bluebird<string[]>}
	 */
	gettingVersions(platformId = this.config.PLATFORM_ID) {
		return this.executingRequest(`/versions`, platformId);
	}
}

module.exports = StaticDataEndpoint;