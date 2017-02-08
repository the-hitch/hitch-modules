module.exports = function(decorator) {
	var moment = require('moment');

	var link = function($injector) {

		this.title = this.title || '';

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}

	link.prototype.valid = function() {

		return true;
	}

	return link;
}