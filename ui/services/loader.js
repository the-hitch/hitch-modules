module.exports = function($rootScope) {

	var loaders = new Array();

	var loader = function() {
		loaders.push(true);

		$rootScope.loading = true;

		return {
			stop: (function(i) {
				return function() {
					loaders.splice(i, 1);

					if (loaders.length == 0) {
						$rootScope.loading = false;
					}
				}
			})(loaders.length - 1)
		}
	}

	return function() {
		return new loader();
	}
}