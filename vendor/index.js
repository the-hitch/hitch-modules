angular.module('vendor', [
	'account',
	'amenity',
	'analytics',
	'faq',
	'hgResource',
	'image',
	'link',
	'message',
	'product',
	'region',
	'user',
])

.provider('Vendor', require('./provider'))