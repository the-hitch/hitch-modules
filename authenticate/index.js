require('angular-messages')

angular.module('authenticate', [
	'cookies',
	'ngMessages',
])

.config(require('./intercepter'))

.provider('Authenticate', require('./provider'))
.factory('forgot', require('./forgot'))
.factory('signin', require('./signin'))
.factory('reset', require('./reset'))