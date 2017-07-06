angular.module('hitch.analytics', [
	'hgResource',
])

.provider('Analytics', ['ResourceProvider', require('./provider')])