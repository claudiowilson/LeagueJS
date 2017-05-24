const Bluebird = require('bluebird');

class RateLimiter { // TODO: unit tests
	/**
	 *
	 * @param maxOpsPerInterval
	 * @param intervalMS
	 * @param allowBursts if false, the requests will be executed with a timely spacing in between
	 * to ensure rate-limits will not be exceeded.
	 * If true, the maximum number of executions per interval will be started as soon as possible.
	 */
	constructor(maxOpsPerInterval, intervalMS, allowBursts) {
		this._maxRate = allowBursts ? maxOpsPerInterval : maxOpsPerInterval / intervalMS;
		this._intervalMS = intervalMS;
		this._allowBursts = allowBursts;

		this._numOpsStartedInActiveInterval = 0;
		this._startMS = new Date().getTime();
		this._queue = [];
	}

	scheduling(fn) {
		return Bluebird.resolve().then(() => {
			let now = new Date().getTime(),
				elapsedMS = now - this._startMS;

			if (elapsedMS > this._intervalMS) { // new interval starts
				this._numOpsStartedInActiveInterval = 0;
				this._startMS = now;
			}

			let currentRate = this._numOpsStartedInActiveInterval / (this._allowBursts ? 1 : elapsedMS);

			if (currentRate < this._maxRate) {
				if (this._queue.length === 0) {
					this._numOpsStartedInActiveInterval++;
					return fn();
				} else {
					if (fn) {
						this._queue.push(fn);
					}
					this._numOpsStartedInActiveInterval++;
					return this._queue.shift()();
				}
			} else {
				if (fn) {
					this._queue.push(fn);
				}

				return Bluebird.delay(1 / this._maxRate).then(()=>this.scheduling());
			}
		});
	}

}
module.exports = RateLimiter;