angular.module('plan', [
	'hgResource',
])

.provider('Plan', ['ResourceProvider', require('./provider')])