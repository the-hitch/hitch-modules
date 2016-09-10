module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		extend: function(extend) {
			this.extend = extend;
		},

		$get: function(Resource) {
		    return Resource('vendor/:id/:slug', {
		        id: '@id',
		        slug: '@slug'
		    }, {
		        Vendor: ['User', 'Message', 'Account', require('./factory.js')(this.extend)]
		    }, {
		    	query: {
		    		method: 'get',
		    		isArray: true,
		    		cancellable: true
		    	}
		    });
		}

	}
}