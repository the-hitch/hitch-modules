module.exports = function(decorator) {
	var moment = require('moment');

	var subscription = function(Plan) {

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		this.plan = new Plan(this.plan.data || this.plan)

		return this;
	}

	subscription.prototype.transform = function($injector) {
		if (decorator && decorator.prototype.transform) {
			return $injector.invoke(decorator.prototype.transform, this);
		}
	}	

	return subscription;
}