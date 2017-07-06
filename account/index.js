angular.module('hitch.account', [
	'hgResource',
	'hitch.payment'
])

.provider('Account', ['ResourceProvider', require('./provider')])