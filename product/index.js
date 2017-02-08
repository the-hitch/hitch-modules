angular.module('product', [
	'hgResource',
])

.provider('Product', require('./provider'))
.filter('product', require('./filter'))