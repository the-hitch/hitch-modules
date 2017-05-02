angular.module('subscription', [
	'hgResource',
])

.provider('Subscription', ['ResourceProvider', require('./provider')])