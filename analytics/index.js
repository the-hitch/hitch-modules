angular.module('analytics', [
	'hgResource',
])

.provider('Analytics', ['ResourceProvider', require('./provider')])