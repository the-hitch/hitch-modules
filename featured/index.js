angular.module('featured', [
	'hgResource',
])

.provider('Featured', ['ResourceProvider', require('./provider')])