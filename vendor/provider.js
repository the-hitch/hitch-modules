module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		extend: function(extend) {
			this.extend = extend;
		},

		$get: function(Resource) {
		    return Resource('vendor/:id/:region/:city/:slug/', {
		        id: '@id',
		    }, require('./factory.js')(this.extend), {
		    	query: {
		    		method: 'get',
		    		isArray: true,
		    		cancellable: true
		    	}
		    });
		}

	}
}