angular.module('hitch.amenity', [
	'hgResource',
])

.provider('Amenity', ['ResourceProvider', require('./provider')])