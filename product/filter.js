module.exports = function() {
	return function(input) {
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
		} else if (product.pretty.indexOf('%') > -1) {
			var unit = '%';
		}

		return "foo";
	}
}