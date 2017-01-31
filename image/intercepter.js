module.exports = function($httpProvider) {

	var intercepter = [function() {
		return {
			request: function(config) {

				if (config.data === undefined)
					return config;

				var exists = false;

				var fd = new FormData();
				angular.forEach(config.data, function(value, key) {
					if (value instanceof File) {
						exists = true;
					}

					fd.append(key, value);
				});

				if (exists) {
					config.headers['Content-Type'] = undefined;
					config.data = fd;
				}

				return config;
			}
		}
	}]

	$httpProvider.interceptors.push(intercepter);
}