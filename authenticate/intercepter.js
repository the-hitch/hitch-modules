module.exports = function($httpProvider) {

    var authHttpInterceptor = ['$q', '$injector', '$cookies', '$rootScope', '$location',
        function($q, $injector, $cookies, $rootScope, $location) {
            var queue = [],
                canceller = $q.defer(),
                refreshing = false;

            function resetQueue() {
                while (queue.length) {
                    queue.pop();
                }

                refreshing = false;
            }

            function refreshToken() {
                var deferred = $q.defer();

                queue.push(deferred);

                if ( ! refreshing) {
                    refreshing = true;

                    $injector.get('Authenticate').refreshToken().then(function() {
                        for (var i = 0; i < queue.length; i++) {
                            queue[i].resolve();
                        };

                        resetQueue()
                    }, function() {
                        for (var i = 0; i < queue.length; i++) {
                            queue[i].reject();
                        };

                        resetQueue();                        
                    });
                }

                return deferred.promise;
            }

            return {
                'request': function(config) {
                    if ($cookies.has('token')) {

                        if ($injector.get('Authenticate').isExpired() && config.url.indexOf("/authenticate/refresh") === -1) {
                            return refreshToken().then(function() {
                                config.headers.Authorization = "Bearer " + $cookies.get('token');
                                return config;
                            }, function() {
                                config.timeout = canceller.promise;

                                canceller.resolve();

                                $cookies.remove('token');
                                $location.path('/');

                                return config;
                            });
                        } else {
    	                    config.headers.Authorization = "Bearer " + $cookies.get('token');
                            return config || $q.when(config);
                        }
	                }

					return config;	                
                },
                'response': function(response) {
                    if (response.headers('authorization')) {
                        $cookies.set('token', response.headers('authorization'));
                    }

                    return response;
                },
                'responseError': function(response) {
                    // This is not ideal because if it is on a non authentication (signin/sugnup) request
                    // it will redirect the user to signin anyway.
                    if (response.status == 401) {
                        $cookies.remove('token');
                        $location.path('/');
                    }

                    return $q.reject(response);
                }
            }
        }
	]

    $httpProvider.interceptors.push(authHttpInterceptor);
}