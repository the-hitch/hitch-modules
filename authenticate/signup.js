module.exports = function(modal) {
	return modal({
		controller: function($scope, $state, signup, signin, Authenticate, User) {
			$scope.loading = false;

			$state.go('.', { signup: true })

			$scope.$on("$destroy", function() {
				$state.go('.', { signup: null })
			})

			$scope.close = function() {
				signup.reject();
			}

			$scope.openSignin = function() {
				signup.reject();
				signin.open().then(function(){}, function(){});
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