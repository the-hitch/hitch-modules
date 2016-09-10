angular.module('account', [
	'hgResource',
	'payment'
])

.provider('Account', ['ResourceProvider', require('./provider')])