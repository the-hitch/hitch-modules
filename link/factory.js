module.exports = function(extend) {
	var moment = require('moment');

	return function() {

		this.title = this.title || '';

		return this;
	}
}