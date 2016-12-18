angular.module('faq', [
	'hgResource',
])

.provider('Faq', ['ResourceProvider', require('./provider')])