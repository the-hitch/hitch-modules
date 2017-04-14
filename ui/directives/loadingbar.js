module.exports = function() {
	return {
		restrict: 'E',
		link: function($scope, element) {
			$scope.element = element;
		},
		controller: function($scope, $rootScope, $animate) {
			$rootScope.$watch('loading', function(loading) {
				
				if (loading) {
					$animate.addClass($scope.element, 'show')
				} else {
					$animate.removeClass($scope.element, 'show')
				}

			})
		}
	}
}