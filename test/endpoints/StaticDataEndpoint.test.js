describe('ChampionEndpoint Testsuite', function () {
	'use strict';

	const StaticDataEndpoint = require('../../lib/endpoints/StaticDataEndpoint');

	const chai = require("chai");
	const chaiAsPromised = require("chai-as-promised");
	const should = chai.should;
	const expect = chai.expect;
	chai.use(chaiAsPromised);
	chai.should();

	const TestUtil = require('../TestUtil');
	let mergedConfig = TestUtil.getTestConfig();

	const mock_summoner = TestUtil.mocks.summoners.Colorfulstan;
	const mock_champion = TestUtil.mocks.champions.Akali;
	const mock_item = TestUtil.mocks.items.IonianBoots;
	const mock_mastery = TestUtil.mocks.masteries.Fury;
	const mock_rune = TestUtil.mocks.runes.lesserMarkOfAttackSpeed;
	const mock_summonerSpell = TestUtil.mocks.summonerSpells.Flash;

	let endpoint;
	beforeEach(function () {
		mergedConfig.PLATFORM_ID = mock_summoner.platformId;
		endpoint = new StaticDataEndpoint(mergedConfig);
	});

	it('has its name added to default retryEndpoints', function () {
		endpoint.config.limits.retryEndpoints.should.include(endpoint.name);
	});
	describe('gettingChampions', function () {
		this.timeout(5000); // can take a long time to receive response (2 sec+)

		it('gets the data for all champions', function () {
			return endpoint.gettingChampions()
				.should.eventually.have.property('data');
		});
		it('by default, gets only type, version, data on the main results', function () {
			return endpoint.gettingChampions().then((results) => {
				results.should.have.property('data');
				results.should.have.property('version');
				results.should.have.property('type')
					.equal('champion');
			});
		});
		it('by default, gets id, key, name, and title on the champions data', function () {
			return endpoint.gettingChampions().then(({data}) => {
				data.Akali.should.have.property('id');
				data.Akali.should.have.property('key');
				data.Akali.should.have.property('name');
				data.Akali.should.have.property('title');

				data.Akali.should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version of all champions', function () {
				const version = '7.10.1';
				return endpoint.gettingChampions({version})
					.should.eventually.have.property('version')
					.equal(version);
			});
			it('dataById: can get a all champions by id', function () {
				return endpoint.gettingChampions({dataById: true})
					.should.eventually.have.property('data')
					.with.property(mock_champion.id);
			});
			it('tags: can get a all champions with all additional properties', function () {
				return endpoint.gettingChampions({tags: 'all'}).then(({data}) => {
					data.Akali.should.have.property('image');
				});
			});
			it('tags: can get a all champions with multiple additional properties', function () {
				return endpoint.gettingChampions({tags: ['image', 'lore']}).then(({data}) => {
					data.Akali.should.have.property('image');
					data.Akali.should.have.property('lore');
				});
			});
		});

	});
	describe('gettingSummonerSpellsById', function () {
		it('gets the data for specific champion', function () {
			return endpoint.gettingChampionById(mock_champion.id)
				.should.eventually.have.property('id')
				.equal(mock_champion.id);
		});
		it('by default, gets id, key, name, and title on the champion data', function () {
			return endpoint.gettingChampionById(mock_champion.id).then((champion) => {
				champion.should.have.property('id');
				champion.should.have.property('key');
				champion.should.have.property('name');
				champion.should.have.property('title');

				champion.should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version of the champion', function () {
				const version = '7.10.1';
				return endpoint.gettingChampionById(mock_champion.id, {version})
					.should.eventually.have.property('id')
					.equal(mock_champion.id);
			});
			it('tags: can get a champion with all additional properties', function () {
				return endpoint.gettingChampionById(mock_champion.id, {tags: 'all'})
					.should.eventually.have.property('image');
			});
			it('tags: can get a all champions with multiple additional properties', function () {
				return endpoint.gettingChampionById(mock_champion.id, {tags: ['image', 'lore']}).then((champion) => {
					champion.should.have.property('image');
					champion.should.have.property('lore');
				});
			});
		});

	});

	describe('gettingItems', function () {
		it('gets the data for all items', function () {
			return endpoint.gettingItems()
				.should.eventually.have.property('data');
		});
		it('by default, gets only type, version, data on the main results', function () {
			return endpoint.gettingItems().then((results) => {
				results.should.have.property('data');
				results.should.have.property('version');
				results.should.have.property('type')
					.equal('item');

			});
		});

		it('by default, id, name, description, plaintext, and group on the items data', function () {
			return endpoint.gettingItems().then(({data}) => {
				const testItem = data[mock_item.id];
				testItem.should.have.property('id')
					.equal(mock_item.id);
				testItem.should.have.property('name');
				testItem.should.have.property('description');
				testItem.should.have.property('plaintext');

				testItem.should.not.have.property('group'); // contradicting official docs
				testItem.should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version of all champions', function () {
				const version = '7.10.1';
				return endpoint.gettingItems({version})
					.should.eventually.have.property('version')
					.equal(version);
			});
			it('tags: can get all items with all additional properties', function () {
				return endpoint.gettingItems({tags: 'all'}).then(({data}) => {
					data[mock_item.id].should.have.property('image');
				});
			});
			it('tags: can get all items with multiple additional properties', function () {
				return endpoint.gettingItems({tags: ['image', 'gold']}).then(({data}) => {
					data[mock_item.id].should.have.property('image');
					data[mock_item.id].should.have.property('gold');
				});
			});
		});

	});
	describe('gettingItemById', function () {
		it('gets the data for a specific item', function () {
			return endpoint.gettingItemById(mock_item.id)
				.should.eventually.have.property('id')
				.equal(mock_item.id);
		});
		it('by default, gets id, name, plaintext, and description on the items data', function () {
			return endpoint.gettingItemById(mock_item.id).then((item) => {
				item.should.have.property('id');
				item.should.have.property('name');
				item.should.have.property('plaintext');
				item.should.have.property('description');

				item.should.not.have.property('group'); // contradicting official docs
				item.should.not.have.property('image');
			});
		});
		it('does not include group property (yet?), contradicting official docs', function () {
			return endpoint.gettingItemById(mock_item.id)
				.should.eventually.not.have.property('group');
		});
		describe('options', function () {
			it('version: can get a specific ddragon version of all champions', function () {
				const version = '7.10.1';
				return endpoint.gettingItemById(mock_item.id, {version})
					.should.eventually.have.property('id')
					.equal(mock_item.id);
			});
			it('tags: can get all items with all additional properties', function () {
				return endpoint.gettingItemById(mock_item.id, {tags: 'all'}).then((item) => {
					item.should.have.property('image');
				});
			});
			it('tags: can get all items with multiple additional properties', function () {
				return endpoint.gettingItemById(mock_item.id, {tags: ['image', 'gold']}).then((item) => {
					item.should.have.property('image');
					item.should.have.property('gold');
				});
			});
		});

	});

	describe('gettingLanguageStrings', function () {
		it('gets the data for language strings', function () {
			return endpoint.gettingLanguageStrings()
				.should.eventually.have.property('type')
				.equal('language');
		});
	});
	describe('gettingLanguages', function () {
		it('gets the locale-strings supported by the region', function () {
			return endpoint.gettingLanguages()
				.should.eventually.be.an('Array')
				.and.include('en_US');
		});
	});
	describe('gettingMaps', function () {
		it('gets the map-data', function () {
			return endpoint.gettingMaps()
				.should.eventually.have.property('type')
				.equal('map');
		});
	});

	describe('gettingMasteries', function () {
		it('gets the data for all masteries', function () {
			return endpoint.gettingMasteries()
				.should.eventually.have.property('data');
		});
		it('by default, gets only type, version, data on the main results', function () {
			return endpoint.gettingMasteries().then((results) => {
				results.should.have.property('data');
				results.should.have.property('version');
				results.should.have.property('type')
					.equal('mastery');
			});
		});
		it('by default, gets id, name and description on the data', function () {
			return endpoint.gettingMasteries().then(({data}) => {
				const testMastery = data[mock_mastery.id];
				testMastery.should.have.property('id');
				testMastery.should.have.property('name');
				testMastery.should.have.property('description');

				testMastery.should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version', function () {
				const version = '7.10.1';
				return endpoint.gettingMasteries({version})
					.should.eventually.have.property('version')
					.equal(version);
			});
			it('tags: can get all additional properties', function () {
				return endpoint.gettingMasteries({tags: 'all'}).then(({data}) => {
					data[mock_mastery.id].should.have.property('image');
				});
			});
			it('tags: can get multiple additional properties', function () {
				return endpoint.gettingMasteries({tags: ['image', 'masteryTree']}).then(({data}) => {
					data[mock_mastery.id].should.have.property('image');
					data[mock_mastery.id].should.have.property('masteryTree');
				});
			});
			it('tags: can get the mastery trees', function () {
				return endpoint.gettingMasteries({tags: 'tree'}).then((results) => {
					results.should.have.property('tree')
						.with.property('Resolve')
						.an('Array');
				});
			});
		});

	});
	describe('gettingMasteryById', function () {
		it('gets the data for specific mastery', function () {
			return endpoint.gettingMasteryById(mock_mastery.id)
				.should.eventually.have.property('id')
				.equal(mock_mastery.id);
		});
		it('by default, gets id, name and description on the data', function () {
			return endpoint.gettingMasteryById(mock_mastery.id).then((mastery) => {
				mastery.should.have.property('id');
				mastery.should.have.property('name');
				mastery.should.have.property('description');

				mastery.should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version', function () {
				const version = '7.10.1';
				return endpoint.gettingMasteryById(mock_mastery.id,{version})
					.should.eventually.have.property('id')
					.equal(mock_mastery.id);
			});
			it('tags: can get all additional properties', function () {
				return endpoint.gettingMasteryById(mock_mastery.id,{tags: 'all'}).then((mastery) => {
					mastery.should.have.property('image');
				});
			});
			it('tags: can get multiple additional properties', function () {
				return endpoint.gettingMasteryById(mock_mastery.id, {tags: ['image', 'masteryTree']}).then((mastery) => {
					mastery.should.have.property('image');
					mastery.should.have.property('masteryTree');
				});
			});
		});

	});

	describe('gettingProfileIcons', function () {
		it('gets the profile-icons', function () {
			return endpoint.gettingProfileIcons()
				.should.eventually.have.property('type')
				.equal('profileicon');
		});
	});
	describe('gettingRealms', function () {
		it('gets realm info', function () {
			return endpoint.gettingRealms()
				.should.eventually.have.property('profileiconmax');
		});
	});

	describe('gettingRunes', function () {
		it('gets the data for all', function () {
			return endpoint.gettingRunes()
				.should.eventually.have.property('data');
		});
		it('by default, gets only type, version, data on the main results', function () {
			return endpoint.gettingRunes().then((results) => {
				results.should.have.property('data');
				results.should.have.property('version');
				results.should.have.property('type')
					.equal('rune');
			});
		});
		it('by default, gets id, name, rune and description on the data', function () {
			return endpoint.gettingRunes().then(({data}) => {
				const testRune = data[mock_rune.id];
				testRune.should.have.property('id');
				testRune.should.have.property('name');
				testRune.should.have.property('description');
				testRune.should.have.property('rune');

				testRune.should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version', function () {
				const version = '7.10.1';
				return endpoint.gettingRunes({version})
					.should.eventually.have.property('version')
					.equal(version);
			});
			it('tags: can get all additional properties', function () {
				return endpoint.gettingRunes({tags: 'all'}).then(({data}) => {
					data[mock_rune.id].should.have.property('image');
				});
			});
			it('tags: can get multiple additional properties', function () {
				return endpoint.gettingRunes({tags: ['image', 'tags']}).then(({data}) => {
					data[mock_rune.id].should.have.property('image');
					data[mock_rune.id].should.have.property('tags');
				});
			});
		});

	});
	describe('gettingRunesById', function () {
		it('gets the data for specific rune', function () {
			return endpoint.gettingRunesById(mock_rune.id)
				.should.eventually.have.property('id')
				.equal(mock_rune.id);
		});
		it('by default, gets id, name, rune, and description on the data', function () {
			return endpoint.gettingRunesById(mock_rune.id).then((mastery) => {
				mastery.should.have.property('id');
				mastery.should.have.property('name');
				mastery.should.have.property('rune');
				mastery.should.have.property('description');

				mastery.should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version', function () {
				const version = '7.10.1';
				return endpoint.gettingRunesById(mock_rune.id,{version})
					.should.eventually.have.property('id')
					.equal(mock_rune.id);
			});
			it('tags: can get all additional properties', function () {
				return endpoint.gettingRunesById(mock_rune.id,{tags: 'all'}).then((mastery) => {
					mastery.should.have.property('image');
				});
			});
			it('tags: can get multiple additional properties', function () {
				return endpoint.gettingRunesById(mock_rune.id, {tags: ['image', 'stats']}).then((mastery) => {
					mastery.should.have.property('image');
					mastery.should.have.property('stats');
				});
			});
		});

	});


	describe('gettingSummonerSpells', function () {
		it('gets the data for all champions', function () {
			return endpoint.gettingSummonerSpells()
				.should.eventually.have.property('data');
		});
		it('by default, gets only type, version, data on the main results', function () {
			return endpoint.gettingSummonerSpells().then((results) => {
				results.should.have.property('data');
				results.should.have.property('version');
				results.should.have.property('type')
					.equal('summoner');
			});
		});
		it('by default, gets id, key, name, description and summonerLevel on the data', function () {
			return endpoint.gettingSummonerSpells().then(({data}) => {
				data[mock_summonerSpell.key].should.have.property('id');
				data[mock_summonerSpell.key].should.have.property('key');
				data[mock_summonerSpell.key].should.have.property('name');
				data[mock_summonerSpell.key].should.have.property('description');
				data[mock_summonerSpell.key].should.have.property('summonerLevel');

				data[mock_summonerSpell.key].should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version of all champions', function () {
				const version = '7.10.1';
				return endpoint.gettingSummonerSpells({version})
					.should.eventually.have.property('version')
					.equal(version);
			});
			it('dataById: can get by id', function () {
				return endpoint.gettingSummonerSpells({dataById: true})
					.should.eventually.have.property('data')
					.with.property(mock_summonerSpell.id);
			});
			it('tags: can get a all champions with all additional properties', function () {
				return endpoint.gettingSummonerSpells({tags: 'all'}).then(({data}) => {
					data[mock_summonerSpell.key].should.have.property('image');
				});
			});
			it('tags: can get a all champions with multiple additional properties', function () {
				return endpoint.gettingSummonerSpells({tags: ['image', 'cooldown']}).then(({data}) => {
					data[mock_summonerSpell.key].should.have.property('image');
					data[mock_summonerSpell.key].should.have.property('cooldown');
				});
			});
		});

	});
	describe('gettingSummonerSpellsById', function () {
		it('gets the data for specific summonerSpell', function () {
			return endpoint.gettingSummonerSpellsById(mock_summonerSpell.id)
				.should.eventually.have.property('id')
				.equal(mock_summonerSpell.id);
		});
		it('by default, gets id, key, name, description and summonerLevel on the data', function () {
			return endpoint.gettingSummonerSpellsById(mock_summonerSpell.id).then((summonerSpell) => {
				summonerSpell.should.have.property('id');
				summonerSpell.should.have.property('key');
				summonerSpell.should.have.property('name');
				summonerSpell.should.have.property('description');
				summonerSpell.should.have.property('summonerLevel');

				summonerSpell.should.not.have.property('image');
			});
		});
		describe('options', function () {
			it('version: can get a specific ddragon version', function () {
				const version = '7.10.1';
				return endpoint.gettingSummonerSpellsById(mock_summonerSpell.id, {version})
					.should.eventually.have.property('id')
					.equal(mock_summonerSpell.id);
			});
			it('tags: can get a champion with all additional properties', function () {
				return endpoint.gettingSummonerSpellsById(mock_summonerSpell.id, {tags: 'all'})
					.should.eventually.have.property('image');
			});
			it('tags: can get a all champions with multiple additional properties', function () {
				return endpoint.gettingSummonerSpellsById(mock_summonerSpell.id, {tags: ['image', 'cooldown']}).then((champion) => {
					champion.should.have.property('image');
					champion.should.have.property('cooldown');
				});
			});
		});

	});

	describe('gettingVersions', function () {
		it('gets all valid version-strings for data dragon resources', function () {
			return endpoint.gettingVersions()
				.should.eventually.be.an('Array')
				.and.contain('7.9.1');
		});
	});

});