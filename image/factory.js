module.exports = function(extend) {
	var moment = require('moment');

	return function() {

		this.url = this.host + this.path;

		if (extend) {
			angular.extend(this, extend(this))	
		}

		return this;
	}
}