module.exports = function(decorator) {
	var moment = require('moment');

	return function($injector, User) {
		this.created_at = moment.utc(this.created_at);
		
		if (this.user) {
			if (this.user.data) {
				this.user = new User(this.user.data);
			}
		}

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}
}