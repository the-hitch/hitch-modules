module.exports = function($rootScope, $state, $animate, $transitions) {
    return {
        restrict: 'E',
        link: function(scope, element) {
            $transitions.onFinish({}, function(transition) {
                var from = transition.from().name.split(".").join("-");
                var to = transition.to().name.split(".").join("-");

                $animate.removeClass(element, from);
                $animate.addClass(element, to);
            });
        }
    }
}