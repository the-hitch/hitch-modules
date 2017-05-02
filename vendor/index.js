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
	'subscription',
	'region',
	'user',
])

.provider('Vendor', require('./provider'))