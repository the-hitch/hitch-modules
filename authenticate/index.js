require('angular-messages')

angular.module('authenticate', [
	'cookies',
	'ngMessages',
	'factories'
])

.config(require('./intercepter'))

.provider('Authenticate', require('./provider'))
.factory('forgot', require('./forgot'))
.factory('signin', require('./signin'))
.factory('signup', require('./signup'))
.factory('reset', require('./reset'))