angular.module('hitch.subscription', [
	'hgResource',
])

.provider('Subscription', ['ResourceProvider', require('./provider')])