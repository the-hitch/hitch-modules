require('angular-animate');
require('angular-modal');

angular.module('hitch.ui', [
	'ngAnimate',
	'btford.modal',
])

.service('Loader', require('./services/loader'))
.directive('loadingdots', require('./directives/loadingdots'))
.directive('loadingbar', require('./directives/loadingbar'))
.directive('clamp', require('./directives/clamp'))
.directive('body', require('./directives/body'))
.directive('fileupload', require('./directives/fileupload'))

.filter('asset', require('./filters/asset'))
.filter('trust', require('./filters/trust'))
.filter('words', require('./filters/words'))

.factory('modal', require('./factories/modal'))