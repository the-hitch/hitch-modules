angular.module('hitch.plan', [
	'hgResource',
])

.provider('Plan', ['ResourceProvider', require('./provider')])