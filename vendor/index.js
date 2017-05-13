angular.module('vendor', [
	'account',
	'amenity',
	'analytics',
	'faq',
	'hgResource',
	'image',
	'link',
	'messageThread',
	'product',
	'subscription',
	'region',
	'user',
])

.provider('Vendor', require('./provider'))