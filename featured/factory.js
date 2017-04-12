module.exports = function(decorator) {
	var moment = require('moment');
	
	return function(Vendor, $injector) {

		this.vendor = new Vendor(this.vendor.data);

		this.date = new moment(this.date);

		if (decorator) {
			angular.extend(this, $injector.invoke(decorator, this));	
		}

		return this;
	}
}