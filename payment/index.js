angular.module('hitch.payment', [
	'hgResource',
])

.provider('Payment', ['ResourceProvider', require('./provider')])