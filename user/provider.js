module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		decorate: function(decorator) {
			this.decorator = decorator;
		},

		setCurrent: function(user, include) {
			this.user = this.user || {};
			
			this.user[include] = user;
		},

		getCurrent: function(include) {
			this.user = this.user || {};

			return this.user[include];
		},

		$get: function(Resource, $cookies, $q, $rootScope) {
			var provider = this;

		    var resource = Resource('user/:id/:action', {
		        id: '@id',
		    }, require('./factory.js')(this.decorator), {
		    	resetPassword: {
		    		method: 'POST',
		    		params: {
		    			action: 'resetPassword'
		    		}
		    	}
		    });

		    resource.current = function(include) {
                var deferred = $q.defer();

                if (provider.getCurrent(include)) {
		    		deferred.resolve(provider.getCurrent(include));
		    	} else if ($cookies.has('token')) {
		    		return resource.get({
		    			id: "me",
		    			include: include
		    		}, function(user) {
		    			provider.setCurrent(user, include);

		    			$rootScope.user = user;
		    		}, function(e) {
		    			console.log("Error: ", e);
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