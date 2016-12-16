module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		decorate: function(decorator) {
			this.decorator = decorator;
		},

		$get: function(Resource) {
		    return Resource('analytics', {}, require('./factory.js')(this.decorator));
		}

	}
}