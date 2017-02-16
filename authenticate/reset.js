module.exports = function(modal) {
	return modal({
		controller: function($scope, $state, reset, signin, Authenticate) {
			$scope.loading = false;

			$scope.$on("$destroy", function() {
				$state.params.remember_token = null;

				$state.go($state.current.name, $state.params, {notify: false});
			});

			$scope.close = function() {
				reset.reject();
			}

			$scope.signin = function() {
				reset.resolve();	
				signin.open();
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