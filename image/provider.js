module.exports = function(ResourceProvider) {
	var moment = require('moment');

	return {

		setHost: ResourceProvider.setApiUrl,

		decorate: function(decorator) {
			this.decorator = decorator;
		},

		$get: function(Resource, $cookies, $q, Authenticate) {
			var resource = Resource('media/:id', {
		        id: '@id',
		    }, require('./factory.js')(this.decorator));

			resource.save = function(image) {
		        var deferred = $q.defer();
		        var request = new XMLHttpRequest();
		        var data = new FormData();

		        data.append('file', image);

		        request.upload.addEventListener("progress", function(evt) {
		            deferred.notify({complete: evt.loaded / evt.total});
		        }, false);

		        request.onload = function() {
		            deferred.resolve(new resource(angular.fromJson(this.response).data));
		        }

		        request.open("post", ResourceProvider.getApiUrl() + 'media', true);
		        
		        function send() {
		            request.setRequestHeader("Authorization", "Bearer " + $cookies.get('token'));
		            request.send(data);            
		        }

		        if (Authenticate.isExpired()) {
		           Authenticate.refreshToken().then(function() {
		                send();
		            });
		        } else {
		            send();
		        }

		        return deferred.promise;
			}

		    return resource;
		}

	}
}