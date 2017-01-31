module.exports = function() {
    return {
        restrict: 'C',
        require: '^dropzone',
        link: function($scope, $element, attrs, controller) {
            $scope.init = true;

            $element.bind('dragover', controller.processDragOverOrEnter);
            $element.bind('dragenter', controller.processDragOverOrEnter);
            $element.bind('drop', controller.select);
            $element.bind('click', function(e) {
                if (e.target.nodeName == 'INPUT') return;

                $scope.$broadcast('open');
            });
        }
    }
}