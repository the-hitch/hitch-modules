module.exports = function(decorator, ResourceProvider) {

	var link = function($injector, $q, $cookies, Authenticate, Link, Loader) {

        var _link = this;

		this.title = this.title || '';

        this.upload = function(file) {
            var loading = new Loader();
            var deferred = $q.defer();
            var request = new XMLHttpRequest();
            var data = new FormData();

            data.append('file', file);

            request.upload.addEventListener("progress", function(evt) {
                deferred.notify({
                    complete: evt.loaded / evt.total
                });
            }, false);

            request.onload = function() {
                var download = new Link(angular.fromJson(this.response).data)

                _link.url = download.url;

                loading.stop();

                deferred.resolve(download);
            }

            request.open("post", ResourceProvider.getApiUrl() + 'file', true);

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

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}

	link.prototype.valid = function() {

		return true;
	}

	return link;
}