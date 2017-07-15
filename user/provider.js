module.exports = function(ResourceProvider) {
	
	return {

		setHost: ResourceProvider.setApiUrl,

		type: "CONSUMER",

		setType: function(type) {
			this.type = type;
		},

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

		clearCurrent: function() {
			this.user = [];
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

		    resource.signedin = false;

		    resource.getType = function(include) {
		    	return provider.type;
		    }

		    resource.clearCurrent = function() {
				$rootScope.User = null;
            
            	resource.signedin = false;
		    	
		    	provider.clearCurrent();
		    }

		    resource.current = function(include, refresh) {
                var deferred = $q.defer();

                if ( ! refresh && provider.getCurrent(include)) {
                	resource.signedin = true;

		    		deferred.resolve(provider.getCurrent(include));
		    	} else if ($cookies.has('token')) {
		    		resource.get({
		    			id: "me",
		    			include: include
		    		}, function(user) {
	                	resource.signedin = true;

		    			provider.setCurrent(user, include);

		    			$rootScope.User = user;
						
						deferred.resolve(user);
		    		}, function(e) {
	                	resource.signedin = false;

		    			console.log("Error: ", e);
			    		deferred.resolve(null);
		    		});
		    	} else {
                	resource.signedin = false;

		    		$rootScope.User = null;

		    		deferred.resolve(null);
		    	}

		    	return deferred;
		    }

		    return resource;
		}
	}
}