module.exports = function($injector) {

    return {

        $get: function($rootScope) {

            var meta = {};

            $rootScope.meta = function(key, append) {
                return (meta[key] || '') + (append || '');
            }

            return function(key, value) {
                meta[key] = value;
            }
        }
    }
}