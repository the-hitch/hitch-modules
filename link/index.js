angular.module('link', [
	'hgResource',
])

.provider('Link', ['ResourceProvider', require('./provider')])