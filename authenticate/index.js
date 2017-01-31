require('angular-messages')

angular.module('authenticate', [
	'cookies',
	'ngMessages',
	'factories'
])

.config(require('./intercepter'))

.provider('Authenticate', require('./provider'))
.factory('forgot', require('./forgot.js'))
.factory('signin', require('./signin.js'))
.factory('signup', require('./signup.js'))