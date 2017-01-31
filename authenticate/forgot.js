module.exports = function(modal) {
	return modal({
		controller: function($scope, forgot, $state, Authenticate, User) {
			$scope.loading = false;

			$scope.user = new User();

			$state.params.forgot = true;

			$state.go($state.current.name, $state.params, {notify: false});

			$scope.$on("$destroy", function() {
				$state.params.forgot = null;

				$state.go($state.current.name, $state.params, {notify: false});
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