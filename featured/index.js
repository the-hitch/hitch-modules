angular.module('hitch.featured', [
	'hgResource',
])

.provider('Featured', ['ResourceProvider', require('./provider')])