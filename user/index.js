angular.module('user', [
	'hgResource',
	'vendor',
])

.provider('User', ['ResourceProvider', require('./provider')])