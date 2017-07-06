angular.module('hitch.product', [
	'hgResource',
])

.directive('validProduct', require('./directive'))
.provider('Product', require('./provider'))
.filter('product', require('./filter'))