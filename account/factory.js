module.exports = function(decorator) {
	var moment = require('moment');

	var account = function(User, Payment, $injector) {

		this.users = (function(users) {
			users = users.map(function(user) {
				return new User(user);
			});

			users.sort(function(a, b) {
				return (a.current ? -1 : 1);
			});

			return users;
		})(this.users.data);

		this.payment = (this.payment ? new Payment(this.payment.data) : null);

		this.created_at = new moment(this.created_at);
		
		this.trial = (function(trial) {
			return {
				remaining: trial.diff(moment(), 'days')
			}
		})(new moment(this.trial));

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}

	account.prototype.transform = function($injector) {
		if (decorator && decorator.prototype.transform) {
			return $injector.invoke(decorator.prototype.transform, this);
		}
	}	

	return account;
}