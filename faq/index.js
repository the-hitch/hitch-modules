angular.module('hitch.faq', [
	'hgResource',
])

.provider('Faq', ['ResourceProvider', require('./provider')])