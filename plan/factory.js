module.exports = function(decorator) {
	var moment = require('moment');

	var plan = function() {

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}

	plan.prototype.transform = function($injector) {
		if (decorator && decorator.prototype.transform) {
			return $injector.invoke(decorator.prototype.transform, this);
		}
	}	

	return plan;
}