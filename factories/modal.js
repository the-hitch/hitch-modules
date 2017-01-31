module.exports = function(btfModal, $q) {
	return function(options) {
        var deferred;

		var modal = btfModal(options);

		modal.resolve = function(value) {
            deferred.resolve(value);
			
			modal.deactivate();
		}

		modal.reject = function(value) {
            deferred.reject(value);
			
			modal.deactivate();
		}

		modal.open = function(scope) {
			deferred = $q.defer();

			modal.activate(scope);

			return deferred.promise;
		}

		return modal;
	}
}