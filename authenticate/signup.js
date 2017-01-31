module.exports = function(modal) {
	return modal({
		controller: function($scope, $rootScope, $state, signup, signin, Authenticate, User) {
			$scope.loading = false;

			$state.params.signup = true;

			$state.go($state.current.name, $state.params, {notify: false});

			$scope.$on("$destroy", function() {
				$state.params.signup = null;

				$state.go($state.current.name, $state.params, {notify: false});
			})

			$scope.close = function() {
				signup.reject();
			}

			$scope.openSignin = function() {
				signup.reject();
				signin.open();
			}

			$scope.submit = function() {
				$scope.error = null;

				if ($scope.form.$invalid) {
					return;
				}

				$scope.loading = true;

				Authenticate.signup($scope.user).then(function() {
					$scope.loading = false;
					signup.resolve();
				}, function(e) {
					$scope.error = e.error;
					
					$scope.loading = false;
				});
			}
		},
		controllerAs: 'modal',
		template: require('./html/signup.html')
	})
}