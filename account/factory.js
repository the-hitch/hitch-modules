module.exports = function(decorator) {
	var moment = require('moment');

	var account = function(User, Payment, $injector, Vendor) {

		this.users = (function(users) {
			users = users.map(function(user) {
				return new User(user);
			});

			users.sort(function(a, b) {
				return (a.current ? -1 : 1);
			});

			return users;
		})(this.users ? this.users.data : []);

		this.vendors = (function(vendors) {
			return vendors.map(function(vendor) {
				return new Vendor(vendor);
			})
		})(this.vendors ? this.vendors.data : [])

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

	account.prototype.transform = function($q, $injector) {
        var promises = [];

		if (decorator && decorator.prototype.transform) {
			promises.push($injector.invoke(decorator.prototype.transform, this));
		}

        return $q.all(promises);
	}	

	return account;
}