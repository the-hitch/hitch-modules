module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		extend: function(extend) {
			this.extend = extend;
		},

		$get: function(Resource, $cookies, $q, $rootScope) {
		    var resource = Resource('user/:id/:action', {
		        id: '@id',
		    }, require('./factory.js')(this.extend), {
		    	resetPassword: {
		    		method: 'POST',
		    		params: {
		    			action: 'resetPassword'
		    		}
		    	}
		    });

		    resource.current = function() {
                var deferred = $q.defer();

		    	if ($cookies.has('token')) {
		    		return resource.get({id: "me"}, function(user) {
		    			$rootScope.user = user;
		    		}).$promise;
		    	} else {
		    		$rootScope.user = null;

		    		deferred.reject(null);
		    	}

		    	return deferred.promise;
		    }

		    return resource;
		}
	}
}