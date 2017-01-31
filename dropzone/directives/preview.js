module.exports = function($animate, dropzone) {
    return {
        restrict: 'C',
        require: '^dropzone',
        scope: false,
        link: function($scope, element, attrs, controller) {

            $scope.remove = function(event) {
                $animate.addClass(element, 'remove');

                $scope.$evalAsync(function() {
                    controller.previews.splice(controller.previews.indexOf($scope.preview), 1);
                })
            }

            element.bind('mouseover mouseout', function(event) {
                $scope.$evalAsync(function() {
                    switch (event.type) {
                        case 'mouseover' :
                            element.addClass('hover')
                        break;
                        case 'mouseout' :
                            element.removeClass('hover')
                        break;
                    }
                });
            });

            element.bind('dragstart', function(event) {
                dropzone.draggedPreview = $scope.preview;
            });

            element.bind('dragover', function(event) {
                event.stopPropagation(); event.preventDefault();

                if (dropzone.draggedPreview.id == controller.previews[controller.previews.indexOf($scope.preview)].id) return;

                var toPosition = controller.previews.indexOf($scope.preview);
                var fromPosition = controller.previews.indexOf(dropzone.draggedPreview);

                $scope.$evalAsync(function() {
                    controller.previews.splice(toPosition, 0, controller.previews.splice(fromPosition, 1)[0]);
                });
            });
        }
    }
}