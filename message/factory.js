module.exports = function(decorator) {
	var moment = require('moment');
	var notify = require('hungry-notify');

	return function($injector, Vendor, User) {
		var thread = this;

		this.notify = new notify();

		this.read = true;

		this.messages = (function(messages) {
			return messages.map(function(message) {
				message.created_at = moment.utc(message.created_at);

				message.user = new User(message.user.data);

				if ( ! message.read) {
					thread.read = false;
				}

				return message;
			});
		})(this.messages ? this.messages.data : [])

		this.created_at = moment.utc(this.created_at);

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}
}