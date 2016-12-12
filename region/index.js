angular.module('region', [
	'hgResource',
])

.provider('Region', ['ResourceProvider', require('./provider')])