module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		decorate: function(decorator) {
			this.decorator = decorator;
		},

		$get: function(Resource) {
		    return Resource('image/:id', {
		        id: '@id',
		    }, require('./factory.js')(this.decorator));
		}

	}
}