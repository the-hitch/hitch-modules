module.exports = function(extend) {
	var moment = require('moment');

	return function(Vendor) {

		if (this.vendors) {
			var total = this.vendors.total;

			this.vendors = this.vendors.data.map(function(vendor) {
				return new Vendor(vendor);
			});

			this.vendors.total = total;
		}

		if (extend) {
			angular.extend(this, extend(this))	
		}

		return this;
	}
}