angular.module('messageThread', [
	'hgResource',
	'message',
	'vendor',
	'user',
])

.provider('MessageThread', ['ResourceProvider', require('./provider')])