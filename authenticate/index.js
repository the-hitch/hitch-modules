require('angular-messages')

angular.module('hitch.authenticate', [
	'cookies',
	'ngMessages',
])

.config(require('./intercepter'))

.provider('Authenticate', require('./provider'))