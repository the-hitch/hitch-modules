angular.module('message', [
	'hgResource',
	'vendor',
	'user',
])

.provider('Message', ['ResourceProvider', require('./provider')])