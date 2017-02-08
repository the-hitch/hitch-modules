module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		decorate: function(decorator) {
			this.decorator = decorator;
		},

		$get: function(Resource) {
		    var resource = Resource('vendor/:id/:region/:city/:slug/', {
		        id: '@id',
		    }, require('./factory.js')(this.decorator), {
		    	query: {
		    		method: 'get',
		    		isArray: true,
		    		cancellable: true
		    	}
		    });

		    return resource;
		}
	}
}