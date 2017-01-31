require('angular-modal')

angular.module('factories', [
	'btford.modal'
])

.factory('modal', require('./modal'))