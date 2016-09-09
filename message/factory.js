module.exports = function(extend) {
	var moment = require('moment');

	return function(Vendor, User) {
		if (extend) {
			angular.extend(this, extend(this))	
		}

		this.messages = (function(messages) {
			return messages.map(function(message) {
				message.user = new User(message.user.data);

				return message;
			});
		})(this.messages.data)

		this.created_at = new moment(this.created_at);

		return this;
	}
}