angular.module('hitch.ui', [
	'ngAnimate'
])

.service('Loader', require('./services/loader'))
.directive('loadingdots', require('./directives/loadingdots'))
.directive('loadingbar', require('./directives/loadingbar'))