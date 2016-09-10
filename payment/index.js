angular.module('payment', [
	'hgResource',
])

.provider('Payment', ['ResourceProvider', require('./provider')])