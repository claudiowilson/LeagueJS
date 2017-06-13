class ChampionUtil {
	/**
	 * Removes spaces and special characters.
	 * For certain Champions it returns set keys.
	 * Useful in special cases when reading champions from logs for Example.
	 * @param name
	 * @return string
	 */
	static getChampionKeyFromName(name) {
		let key = name;

		// strip out all non-alphanumeric characters + whitespace
		key = key.replace(/[^A-Za-z0-9]/g, '');

		// special names that don't follow the universal rule (yet!? - watch test-result to see if it changes)
		switch (name) {
			case 'Kha\'Zix':
				key = 'Khazix';
				break;
			case 'Cho\'Gath':
				key = 'Chogath';
				break;
			case 'Vel\'Koz':
				key = 'Velkoz';
				break;
			case 'Wukong':
				key = 'MonkeyKing';
				break;
			case 'LeBlanc':
				key = 'Leblanc';
				break;

		}
		return key;
	}
}
module.exports = ChampionUtil;