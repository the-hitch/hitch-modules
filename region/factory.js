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

		if (this.country) {
			this.country = {
				id: this.country.data.id,
				title: this.country.data.title,
				slug: this.country.data.slug
			}
		} else {
			this.country = {};
		}

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}
}