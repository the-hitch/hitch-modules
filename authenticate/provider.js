module.exports = function($injector) {

    var Moment = require('moment');
    
    var interceptors = [];

    var defaults = {};

    function intercept(type, data) {
        angular.forEach(interceptors, function(interceptor) {
            
            for (var key in interceptor) {
                if (key == type) {
                    interceptor[key](data);
                }
            }
        });    
    }

    return {

        interceptors: interceptors,

        $get: function($q, $cookies, $http, $state, $rootScope, $location, Resource, User) {

            var refreshPath = "authenticate/refresh";

        	return {
                refreshPath: refreshPath,

        		signin: function(data) {
                    var deferred = $q.defer();

	                $http({
	                    method: 'POST',
	                    data: {
	                        email: data.email,
	                        password: data.password,
	                    },
	                    url: process.env.api.host + 'authenticate'
	                })
                    .then(function(response) {
                        $cookies.set('token', response.data.token, 'Infinity');

                        User.current();

                        deferred.resolve();                        
	                }, function(response) {
                        deferred.reject(response);                            
                    });

                    return deferred.promise;
	            },

                signup: function(data) {
                    var deferred = $q.defer();

                    $http({
                        method: 'POST',
                        data: {
                            name: data.name,
                            email: data.email,
                            password: data.password,
                        },
                        url: process.env.api.host + 'signup'
                    }).then(function(response) {
                        $cookies.set('token', response.data.token, 'Infinity');

                        User.current();

                        deferred.resolve();                        
                    }, function(response) {
                        deferred.reject(response.data);                            
                    });

                    return deferred.promise;
                },

                signout: function(data) {
                    $cookies.remove('token');

                    $rootScope.user = null;
                },

                refreshToken: function() {
                    var deferred = $q.defer();

                    $http({
                        method: 'POST',
                        url: Resource.apiUrl + refreshPath
                    }).then(function(response) {
                        console.log(response)
                        if (response.status == 200) {
                            $cookies.set('token', response.data.token, 'Infinity');
                            deferred.resolve();
                        } else {
                            deferred.reject();                            
                        }
                    })

                    return deferred.promise;
                }
        	}
        }
    }
}