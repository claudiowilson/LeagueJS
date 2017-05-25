module.exports = (wrapper) => {
    let _instance = null;

    let warn = () => console.warn('This method is deprecated, use the new object api: https://github.com/claudiowilson/LeagueJS/blob/master/README.md');

    let cb = (callback, err, data) => {
        if (typeof (callback) == 'function') {
            callback(err, data);
        }
    }

    wrapper.init = (key, region = 'na') => {
        warn();

        __instance = new wrapper({
            "API_KEY": key,
            "region": region
        });
    }

    wrapper.Summoner = {};

    wrapper.Summoner.getByName = (names, region, callback) => {
        return new Promise((resolve, reject) => {
            warn();

            if (_instance == null) {
                console.error("Wrapper not initialized.");
            }

            _instance.gettingByName(names, { region: region }).then(
                data => {
                    cb(callback, null, data);
                    resolve(res);
                },
                err => {
                    cb(callback, null, data);
                    resolve(res);
                }
            );
        });
    };
}