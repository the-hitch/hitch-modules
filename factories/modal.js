module.exports = function(btfModal, $q, $rootScope, $timeout) {
	var notify = require('hungry-notify');

	return function(options) {
        var deferred;

		var modal = btfModal(options);

		modal.notify = new notify();

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

			modal.activate(scope).then(function() {
				$timeout(function() {
					modal.notify.trigger('opened');
				});
			}, function() {});

			return deferred.promise;
		}

		return modal;
	}
}