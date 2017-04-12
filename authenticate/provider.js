module.exports = function($injector) {

    var moment = require('moment');
    
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

    function urlBase64Decode(str) {
       var output = str.replace('-', '+').replace('_', '/');
       switch (output.length % 4) {
           case 0:
               break;
           case 2:
               output += '==';
               break;
           case 3:
               output += '=';
               break;
           default:
               throw 'Illegal base64url string!';
       }
       return window.atob(output);
   }

    return {

        interceptors: interceptors,

        $get: function(config, $q, $cookies, $http, $state, $rootScope, $location, Resource, User) {

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
	                    url: config.api.host + 'authenticate'
	                })
                    .then(function(response) {
                        $cookies.set('token', response.data.token, 'Infinity');

                        deferred.resolve();                        
	                }, function(response) {
                        deferred.reject(response.data);                            
                    });

                    return deferred.promise;
	            },

                signup: function(data) {
                    var deferred = $q.defer();

                    $http({
                        method: 'POST',
                        data: {
                            type: User.getType(),
                            name: data.name,
                            email: data.email,
                            password: data.password,
                        },
                        url: config.api.host + 'signup'
                    }).then(function(response) {
                        $cookies.set('token', response.data.token, 'Infinity');

                        deferred.resolve();                        
                    }, function(response) {
                        deferred.reject(response.data);                            
                    });

                    return deferred.promise;
                },

                signout: function(data) {
                    $cookies.remove('token');

                    User.clearCurrent()
                },

                refreshToken: function() {
                    var deferred = $q.defer();

                    $http({
                        method: 'POST',
                        url: config.api.host + refreshPath
                    }).then(function(response) {
                        if (response.status == 200) {
                            $cookies.set('token', response.data.token, 'Infinity');
                            deferred.resolve();
                        } else {
                            $cookies.remove('token');
                            
                            deferred.reject();                            
                        }
                    }, function() {
                        $cookies.remove('token');
                    })

                    return deferred.promise;
                },

                isExpired: function() {
                    if ( ! $cookies.has('token')) {
                        return true;
                    }

                    var encoded = $cookies.get('token').split('.')[1];
                    var jwt = JSON.parse(urlBase64Decode(encoded));

                    return (new moment().unix() > jwt.exp);
                },

                forgot: function(data) {
                    var deferred = $q.defer();

                    $http({
                        method: 'POST',
                        data: {
                            email: data.email,
                            redirect_host: data.redirect_host || ''
                        },
                        url: config.api.host + "forgot"
                    }).then(function(response) {
                        deferred.resolve();
                    }, function() {
                        deferred.reject();                        
                    })

                    return deferred.promise;
                },

                reset: function(data) {
                    var deferred = $q.defer();

                    $http({
                        method: 'POST',
                        data: {
                            remember_token: data.remember_token,
                            password: data.password
                        },
                        url: config.api.host + "reset"
                    }).then(function(response) {
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    })

                    return deferred.promise;
                }
        	}
        }
    }
}