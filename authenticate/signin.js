module.exports = function(modal) {
	return modal({
		controller: function($scope, $state, signin, signup, forgot, Authenticate, User) {
			$scope.loading = false;
			
			$state.go('.', { signin: true })

			$scope.close = function() {
				$state.go('.', { signin: null })
				signin.reject();
			}

			$scope.openSignup = function() {
				signin.reject();
				signup.open().then(function(){}, function(){});
			}

			$scope.openForgot = function() {
				signin.reject();
				forgot.open().then(function(){}, function(){});
			}

			$scope.submit = function() {
				$scope.error = null;

				if ($scope.form.$invalid) {
					return;
				}

				$scope.loading = true;

				Authenticate.signin($scope.user).then(function() {
					$scope.loading = false;
					signin.resolve();
				}, function(e) {
					$scope.error = e.error;

					$scope.loading = false;
				});
			}
		},
		template: require('./html/signin.html')
	});
}