module.exports = function() {
    return {
        restrict: 'C',
        controller: 'DropzoneController',
        scope: {
            upload: '&',
            minWidth: '@',
            minHeight: '@',
            previews: '=',
        },
        link: function(scope, element, attrs, controller) {
            controller.previews = scope.previews;

            controller.setConfig('minWidth', scope.minWidth);
            controller.setConfig('minHeight', scope.minHeight);
            controller.setConfig('upload', scope.upload);
            controller.setConfig('element', element);
        }
    }
}