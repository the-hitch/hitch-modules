angular.module('authenticate', [
	'cookies'
])

.config(require('./intercepter'))

.provider('Authenticate', require('./provider'));