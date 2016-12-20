angular.module('post', [
	'hgResource',
])

.provider('Post', ['ResourceProvider', require('./provider')])