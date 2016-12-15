module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		extend: function(extend) {
			this.extend = extend;
		},

		setCurrent: function(user) {
			this.user = user;
		},

		getCurrent: function() {
			return this.user;
		},

		$get: function(Resource, $cookies, $q, $rootScope) {
			var provider = this;

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

                if (provider.getCurrent()) {
		    		deferred.resolve(provider.getCurrent());
		    	} else if ($cookies.has('token')) {
		    		return resource.get({
		    			id: "me",
		    			include: "favorites"
		    		}, function(user) {
		    			provider.setCurrent(user);

		    			$rootScope.user = user;
		    		}, function() {
		    			console.log("Error fetching user");
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