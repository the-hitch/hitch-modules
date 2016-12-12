module.exports = function(extend) {
	var moment = require('moment');

	return function(Vendor) {

		if (this.vendors) {
			this.vendors = this.vendors.data.map(function(vendor) {
				return new Vendor(vendor);
			})
		}

		if (extend) {
			angular.extend(this, extend(this))	
		}

		return this;
	}
}