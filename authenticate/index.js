require('angular-messages')

angular.module('authenticate', [
	'cookies',
	'ngMessages',
])

.config(require('./intercepter'))

.provider('Authenticate', require('./provider'))