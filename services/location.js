module.exports = function($http) {
	return {
		get: function() {
			return $http.get("http://ipinfo.io", function(response) {
				console.log(response);
			});
		}
	}
}