module.exports = function(extend) {
	var moment = require('moment');

	return function() {

		if (extend) {
			angular.extend(this, extend(this))	
		}

		return this;
	}
}