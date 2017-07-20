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
        
        setFacebookAppid: function(appid) {
            this.fbappid = appid;
        },

        $get: function(config, $q, $cookies, $http, $state, $rootScope, $location, Resource, User) {

            var refreshPath = "authenticate/refresh",
                facebookStatus,
                fbappid = this.fbappid;

            if (fbappid) {
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: fbappid,
                        autoLogAppEvents: true,
                        xfbml: true,
                        version: 'v2.9'
                    });
                    FB.AppEvents.logPageView();

                    console.log("Facebook Loaded");

                    FB.getLoginStatus(function(response) {
                        facebookStatus = response;
                    });
                };

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "https://connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }

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
                        data: data,
                        url: config.api.host + 'signup'
                    }).then(function(response) {
                        $cookies.set('token', response.data.token, 'Infinity');

                        deferred.resolve();                        
                    }, function(response) {
                        deferred.reject(response.data);                            
                    });

                    return deferred.promise;
                },

                facebook: function(data) {
                    var deferred = $q.defer();

                    var makeRequest = function(token) {
                        $http({
                            method: 'POST',
                            data: angular.extend({}, data, {
                                token: token
                            }),
                            url: config.api.host + 'facebook'
                        }).then(function(response) {
                            $cookies.set('token', response.data.token, 'Infinity');

                            deferred.resolve(response);                        
                        }, function(response) {
                            deferred.reject(response.data);                            
                        });
                    }

                    if (facebookStatus.status == "connected") {
                        makeRequest(facebookStatus.authResponse.accessToken);
                    } else {
                        FB.login(function(response) {
                            if (response.status === 'connected') {
                                FB.api('/me', {fields: 'id,picture,about,email,first_name,gender,last_name'}, function() {
                                    makeRequest(response.authResponse.accessToken);
                                });

                            } else {
                                // The person is not logged into this app or we are unable to tell. 
                            }
                        }, {
                            scope: 'email'
                        });
                    }

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
                    }, function(error) {
                        deferred.reject(error.data);                        
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
                    }, function(error) {
                        deferred.reject(error.data);
                    })

                    return deferred.promise;
                }
        	}
        }
    }
}