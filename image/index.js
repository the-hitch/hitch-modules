angular.module('image', [
	'hgResource',
])

.config(require('./intercepter'))

.provider('Image', require('./provider'))