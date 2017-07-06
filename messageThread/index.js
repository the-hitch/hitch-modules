angular.module('hitch.messageThread', [
	'hgResource',
	'hitch.message',
	'hitch.vendor',
	'hitch.user',
])

.provider('MessageThread', ['ResourceProvider', require('./provider')])