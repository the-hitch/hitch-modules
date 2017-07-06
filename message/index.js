angular.module('hitch.message', [
	'hgResource',
	'hitch.vendor',
	'hitch.user',
])

.provider('Message', ['ResourceProvider', require('./provider')])