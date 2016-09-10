module.exports = function(extend) {
	var moment = require('moment');

	return function(User, Payment) {

		if (extend) {
			angular.extend(this, extend(this))	
		}

		this.users = (function(users) {
			return users.map(function(user) {
				return new User(user);
			});
		})(this.users.data);

		this.payment = (this.payment ? new Payment(this.payment.data) : null);

		this.created_at = new moment(this.created_at);

		return this;
	}
}