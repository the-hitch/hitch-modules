angular.module('vendor', [
	'analytics',
	'hgResource',
	'user',
	'message',
	'account'
])

.provider('Vendor', ['ResourceProvider', require('./provider')])