module.exports = function() {
    return {
        restrict: 'C',
        require: '^dropzone',
        scope: {
            previews: '=',
        },
        link: function($scope, element, attrs, controller) {
            $scope.init = true;

            element.bind('change', function(event) {
                if (event.target.value == '') return;

                controller.select(event);
                event.target.value = '';
            });

            $scope.$on('open', function() {
                element[0].click()
            })
        }
    }
}