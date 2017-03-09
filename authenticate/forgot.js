module.exports = function(modal) {
	return modal({
		controller: function($scope, forgot, $location, Authenticate, User) {
			$scope.loading = false;

			$scope.user = new User({});

			$location.search('forgot', 'true')

			$scope.$on("$destroy", function() {
				$location.search('forgot', null)
			})

			$scope.close = function() {
				forgot.reject();
			}

			$scope.submit = function() {
				$scope.loading = true;

				Authenticate.forgot($scope.user).then(function() {
					$scope.loading = false;
					$scope.success = true;				
				}, function() {
					$scope.loading = false;
				});
			}

		},
		template: require('./html/forgot.html')
	});
}