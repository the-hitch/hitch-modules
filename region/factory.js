module.exports = function(decorator) {
	var moment = require('moment');
	
	return function(Vendor, $injector) {

		if (this.vendors) {
			var total = this.vendors.total;

			this.vendors = this.vendors.data.map(function(vendor) {
				return new Vendor(vendor);
			});

			this.vendors.total = total;
		}

		if (decorator) {
			angular.extend(this, $injector.invoke(decorator, this));	
		}

		return this;
	}
}