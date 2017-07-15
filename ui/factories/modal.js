module.exports = function(btfModal, $q, $rootScope, $timeout) {
	var notify = require('hungry-notify');

	return function(options) {
        var deferred;

		var modal = btfModal(options);

		modal.notify = new notify();

		modal.opened = false;

		modal.resolve = function(value) {
			$rootScope.modal = false;
			
			modal.opened = false;
            
            deferred.resolve(value);
			
			modal.deactivate();
		}

		modal.reject = function(value) {
			$rootScope.modal = false;
			
			modal.opened = false;
            
            deferred.reject(value);
			
			modal.deactivate();
		}

		modal.open = function(scope) {
			deferred = $q.defer();

			modal.opened = true;

			modal.activate(scope).then(function() {
				$timeout(function() {
					modal.notify.trigger('opened');
				});
			}, function() {});
			
			$rootScope.modal = true;

			return deferred.promise;
		}

		return modal;
	}
}