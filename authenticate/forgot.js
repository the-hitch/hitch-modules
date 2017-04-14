module.exports = function(modal) {
	return modal({
		controller: function($scope, forgot, $state, $location, Authenticate, User) {
			$scope.loading = false;

			console.log("Forgot")

			$scope.user = new User({});

			$state.go('.', { forgot: true })

			$scope.$on("$destroy", function() {
				$state.go('.', { forgot: null })
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