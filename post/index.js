angular.module('hitch.post', [
	'hgResource',
])

.provider('Post', ['ResourceProvider', require('./provider')])