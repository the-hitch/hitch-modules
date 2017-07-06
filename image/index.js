angular.module('hitch.image', [
	'hgResource',
])

.config(require('./intercepter'))

.provider('Image', require('./provider'))