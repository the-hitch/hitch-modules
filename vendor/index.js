angular.module('vendor', [
	'account',
	'amenity',
	'analytics',
	'hgResource',
	'image',
	'message',
	'product',
	'user',
])

.provider('Vendor', require('./provider'))