module.exports = function(extend) {
	var moment = require('moment');

	var user = function(Vendor) {

		if (extend) {
			angular.extend(this, extend(this))	
		}

		if (this.favorites) {
			this.favorites = this.favorites.data.map(function(favorite) {
				return new Vendor(favorite);
			});
		}

		if (this.vendors) {
			this.vendors = this.vendors.data.map(function(vendor) {
				return new Vendor(vendor);
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