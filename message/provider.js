module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		extend: function(extend) {
			this.extend = extend;
		},

		$get: function(Resource) {
		    return Resource('message/:id', {
		        id: '@id',
		    }, {
		        Message: ['Vendor', 'User', require('./factory.js')(this.extend)]
		    }, {});
		}

	}
}