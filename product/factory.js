module.exports = function(decorator) {
	var moment = require('moment');
	var notify = require('hungry-notify');

	function getMatches(string, regex, index) {
		index || (index = 1); // default to the first capturing group
		var matches = [];
		var match;
		while (match = regex.exec(string)) {
			matches.push(match[index]);
		}
		return matches;
	}

	var product = function($filter, $injector) {

		this.$delete = function() {
			var product = this;

			this.notify.trigger('deleting');

			this.__proto__.$delete.apply(this).then(function() {
				product.notify.trigger('deleted', product);
			});
		}

		this.pretty = (function(product) {
			if (product.pretty != undefined) return product.pretty;

			if ( product.cost === null && (product.cost_high === null && product.cost_low === null)) {
				return null;
			}

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

			if (product.per && product.per != 'single') {
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
		var product = this;

		var per = getMatches(product.pretty, /\/(.*)/g);

		var range = getMatches(product.pretty, /([0-9,]+)/g);

		product.cost = product.cost_low = product.cost_high = null;

		if (range.length === 2) {
			product.cost_low = range[0].replace(',', '');
			product.cost_high = range[1].replace(',', '');
		} else {
			product.cost = range[0].replace(',', '');
		}

		if (per.length) {
			product.per = per[0];
		} else {
			product.per = 'single';
		}

		if (product.pretty.indexOf('$') > -1) {
			product.unit = '$';
		} else if (product.pretty.indexOf('%') > -1) {
			product.unit = '%';
		} else {
			product.unit = '$';
		}

		if (decorator && decorator.prototype.transform) {
			return $injector.invoke(decorator.prototype.transform, product);
		}

		console.log(product);

		return product;
	}

	return product

}