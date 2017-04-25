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
	'plan',
	'region',
	'user',
])

.provider('Vendor', require('./provider'))