/**
 * Information about the Rate Limiting
 */
class RateInfo { // TODO: add the actual Ratelimiter scheduling

  constructor() {
    this.limits = {};
    this.currentLimits = {};
  }

  /**
   * Check if the information that are currently saved are uptodate
   */
  check() {
    let now = Date.now();
    let limits = Object.keys(this.currentLimits);
    
    for(let i = 0; i < limits.length; i++) {
      if(this.limits[limits[i]].date - now <= 0) {
        this.setCount (limits[i], 0);
      }
    }
  }

  /**
   * Force the Value of a rate range to a value
   */
  setCount( range, value) {
    this.currentLimits[range] = {
      date: Date.now(),
      value: value
    };
  }

  /**
   * Set the current values to enforce
   */
  setLimits(limits) {
    this.limits = limits;
  }

  /**
   * Check if a request would be inside of the rate limits
   */
  insideLimit () {
    this.check();

    let now = Date.now();
    let limits = Object.keys(this.limits);

    for(let i = 0; i < limits.length; i++){
      if(this.currentLimits[limits[i]].date - now > 0 && this.currentLimits[limits[i]].value + 1 < this.limits[limits[i]])  {
        return false;
      }
    }

    return true;
  }

 /**
  * Update the current counts based on a returned header
  */
  update(header){
    let s = header.split(',');
    let now = Date.now();

    for(let i = 0; i < s.length; i++) {
      let l = s[i].split(':');
      this.setCount(l[1], l[0]);
    }
  }
}

let info = new RateInfo();

module.exports = info;