require('angular-animate');

angular.module('hitch.ui', [
	'ngAnimate',
	'ui.router'
])

.service('Loader', require('./services/loader'))
.directive('loadingdots', require('./directives/loadingdots'))
.directive('loadingbar', require('./directives/loadingbar'))
.directive('clamp', require('./directives/clamp'))
.directive('body', require('./directives/body'))
.directive('fileupload', require('./directives/fileupload'))

.filter('asset', require('./filters/asset'))
.filter('trust', require('./filters/trust'))