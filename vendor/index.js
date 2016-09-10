angular.module('vendor', [
	'hgResource',
	'user',
	'message',
	'account'
])

.provider('Vendor', ['ResourceProvider', require('./provider')])