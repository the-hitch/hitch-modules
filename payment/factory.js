module.exports = function(extend) {
	var moment = require('moment');

	return function() {

		if (extend) {
			angular.extend(this, extend(this))	
		}

		this.last_4 = '************' + this.last_4;

		return this;
	}
}