angular.module('hitch.vendor', [
	'hitch.account',
	'hitch.amenity',
	'hitch.analytics',
	'hitch.faq',
	'hgResource',
	'hitch.image',
	'hitch.link',
	'hitch.messageThread',
	'hitch.product',
	'hitch.subscription',
	'hitch.region',
	'hitch.user',
])

.provider('Vendor', require('./provider'))