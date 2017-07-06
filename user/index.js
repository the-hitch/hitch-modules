angular.module('hitch.user', [
	'hgResource',
	'hitch.vendor',
])

.provider('User', ['ResourceProvider', require('./provider')])