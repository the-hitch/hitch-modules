module.exports = function(btfModal, $q, $rootScope) {
	return function(options) {
        var deferred;

		var modal = btfModal(options);

		modal.resolve = function(value) {
			$rootScope.modal = false;
            
            deferred.resolve(value);
			
			modal.deactivate();
		}

		modal.reject = function(value) {
			$rootScope.modal = false;
            
            deferred.reject(value);
			
			modal.deactivate();
		}

		modal.open = function(scope) {
			$rootScope.modal = true;

			deferred = $q.defer();

			modal.activate(scope);

			return deferred.promise;
		}

		return modal;
	}
}