const fs = require('fs');
const path = require('path');

class EndpointUtil {

	/** Returns names of all implemented Endpoints */
	static getEndpointNames() {
		let endpointPath = path.resolve(__dirname, '../endpoints');
		console.log(endpointPath);
		let filenames = fs.readdirSync(endpointPath);
		return filenames.map(filename => filename.replace('Endpoint.js', ''));
	}

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

}

module.exports = EndpointUtil;