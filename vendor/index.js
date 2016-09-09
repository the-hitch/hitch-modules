angular.module('vendor', [
	'hgResource',
	'user',
	'message'
])

.provider('Vendor', ['ResourceProvider', require('./provider')])