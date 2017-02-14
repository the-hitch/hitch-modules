angular.module('product', [
	'hgResource',
])

.directive('validProduct', require('./directive'))
.provider('Product', require('./provider'))
.filter('product', require('./filter'))