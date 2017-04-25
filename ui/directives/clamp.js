module.exports = function() {
	require('../utils/clamp');

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$clamp(element[0], {
				clamp: attrs.clamp
			})
		}
	}
}