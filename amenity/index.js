angular.module('amenity', [
	'hgResource',
])

.provider('Amenity', ['ResourceProvider', require('./provider')])