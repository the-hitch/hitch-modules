module.exports = function(decorator) {
	var moment = require('moment');
	var notify = require('hungry-notify');

	return function($injector) {

		this.notify = new notify();

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}
}