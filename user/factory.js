module.exports = function(extend) {
	var moment = require('moment');

	var user = function(Vendor) {

		if (extend) {
			angular.extend(this, extend(this))	
		}

		if (this.vendors) {
			this.vendors = this.vendors.data;

			this.vendors.map(function(vendor) {
				vendor = new Vendor(vendor);
			});
		}

		if (this.account) {
			this.account = this.account.data;
		}

		this.created_at = new moment(this.created_at);

		return this;
	}

	return user;
}