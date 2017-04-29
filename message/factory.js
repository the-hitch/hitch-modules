module.exports = function(decorate) {
	var moment = require('moment');
	var notify = require('hungry-notify');

	return function(Vendor, User) {
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

		if (decorate) {
			angular.decorate(this, decorate(this))	
		}

		return this;
	}
}