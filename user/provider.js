module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		extend: function(extend) {
			this.extend = extend;
		},

		$get: function(Resource) {
		    return Resource('user/:id', {
		        id: '@id',
		    }, {
		        User: ['Vendor', require('./factory.js')(this.extend)]
		    }, {});
		}

	}
}