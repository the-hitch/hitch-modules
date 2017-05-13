module.exports = function(Product) {

	function getMatches(string, regex, index) {
		index || (index = 1); // default to the first capturing group
		var matches = [];
		var match;
		while (match = regex.exec(string)) {
			matches.push(match[index]);
		}
		return matches;
	}

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			scope.$watch(attrs.ngModel, function(input) {
				var per = getMatches(input, /\/(.*)/g);

				var range = getMatches(input, /([0-9,]+)/g);

				var cost = null;
				var cost_low = null;
				var cost_high = null;

				if (range.length === 2) {
					cost_low = range[0].replace(',', '');
					cost_high = range[1].replace(',', '');
				} else {
					cost = range[0];
				}

				if (per.length) {
					var per = per[0];
				} else {
					per = 'single';
				}

				if (input.indexOf('$') > -1) {
					var unit = '$';
				} else if (input.indexOf('%') > -1) {
					var unit = '%';
				}

				var product = new Product({
					cost_high: cost_high,
					cost_low: cost_low,
					unit: unit,
					cost: cost,
					per: per
				});

				ngModel.$setValidity('valid-product', (product.pretty !== null) && /^[0-9,\-\s\$%]+(\/.*)*$/.test(input) );
			});
		}
	}
}