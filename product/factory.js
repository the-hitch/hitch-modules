module.exports = function(extend) {
	var moment = require('moment');

	return function($filter) {

		this.pretty = (function(product) {
			var str = "";

			$filter('currency')(product.cost_low)

			if (product.cost === null) {
				if (product.cost_low == product.cost_high) {
					if (product.unit == "%") {
						str += product.cost_low + "%";
					} else {
						str += $filter('currency')(product.cost_low, "$", 0);
					}
				} else {
					if (product.unit == "%") {
						str += product.costl_low + "%";
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

		if (extend) {
			angular.extend(this, extend(this))	
		}

		return this;
	}
}