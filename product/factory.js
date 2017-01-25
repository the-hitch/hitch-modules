module.exports = function(decorator) {
	var moment = require('moment');
	var notify = require('hungry-notify');

	var product = function($filter, $injector) {

		this.pretty = (function(product) {
			var str = "";

			$filter('currency')(product.cost_low)

			if (product.cost === null) {
				product.type = 'range';

				if (product.cost_low == product.cost_high) {
					if (product.unit == "%") {
						str += product.cost_low + "%";
					} else {
						str += $filter('currency')(product.cost_low, "$", 0);
					}
				} else {
					if (product.unit == "%") {
						str += product.cost_low + "%";
					} else {
						str += $filter('currency')(product.cost_low, "$", 0);
					}

					str += " - ";

					if (product.unit == "%") {
						str += product.cost_high + "%";
					} else {
						str += $filter('currency')(product.cost_high, "$", 0);
					}
				}
			} else {
				product.type = 'exact';

				if (product.unit == "%") {
					str += product.cost + "%";
				} else {
					str += $filter('currency')(product.cost, "$", 0);
				}
			}

			if (product.per != 'single') {
				str += "/" + product.per;
			}

			return str;
		})(this);

		this.notify = new notify();

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}

	product.prototype.transform = function($injector) {
		if (decorator && decorator.prototype.transform) {
			return $injector.invoke(decorator.prototype.transform, this);
		}
	}

	return product

}