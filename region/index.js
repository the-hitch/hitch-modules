angular.module('hitch.region', [
	'hgResource',
])

.provider('Region', ['ResourceProvider', require('./provider')])