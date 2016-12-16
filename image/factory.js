module.exports = function(decorator) {
	var moment = require('moment');

	return function($injector) {

		this.url = this.host + this.path;

		if (decorator) {
			angular.extend(this, $injector.invoke(decorator, this));	
		}

		return this;
	}
}