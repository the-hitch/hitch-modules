module.exports = function(decorate) {
	var moment = require('moment');

	return function(Vendor, User) {

		this.messages = (function(messages) {
			return messages.map(function(message) {
				message.created_at = new moment(message.created_at);
				message.user = new User(message.user.data);

				return message;
			});
		})(this.messages ? this.messages.data : [])

		this.created_at = new moment(this.created_at);

		if (decorate) {
			angular.decorate(this, decorate(this))	
		}

		return this;
	}
}