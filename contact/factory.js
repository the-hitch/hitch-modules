module.exports = function(decorator) {
	var moment = require('moment');

	return function($injector) {

		if (decorator) {
			$injector.invoke(decorator, this);
		}
		
		return this;
	}
}