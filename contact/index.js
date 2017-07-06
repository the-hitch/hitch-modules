angular.module('hitch.contact', [
	'hgResource',
])

.provider('Contact', ['ResourceProvider', require('./provider')])