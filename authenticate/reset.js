module.exports = function(modal) {
	return modal({
		controller: function($scope, $state, $location, $timeout, reset, signin, Authenticate) {
			$scope.loading = false;

			$scope.$on("$destroy", function() {
				$state.go('.', { remember_token: null })
			});

			$scope.close = function() {
				reset.reject();
			}

			$scope.signin = function() {
				reset.resolve();
				signin.open().then(function() {
					$timeout(function() {
						$state.go('default.dashboard.index');
					})
				}, function() {});				
			}

			$scope.submit = function() {
				$scope.error = null;
				
				if ($scope.form.$invalid) {
					return;
				}

				$scope.loading = true;
				
				Authenticate.reset({
					password: $scope.password,
					remember_token: $state.params.remember_token
				}).then(function() {
					$scope.loading = false;	
					$scope.success = true;				
				}, function() {
					$scope.error = "The token has expired.";

					$scope.loading = false;
				});
			}
		},
		template: require('./html/reset.html')
	});
}