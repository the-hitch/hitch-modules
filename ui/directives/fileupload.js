module.exports = function($rootScope, $compile) {
    return {
        restrict: 'E',
        scope: {
            onComplete: '&',
            link: '=',
            name: '@'
        },
        template: '<div class="fileupload"><label class="btn btn-default" for="{{ name }}">Choose File</a></div>',
        link: function(scope, element, attrs) {
            var input = angular.element($compile('<input name="file" id="{{ name }}" type="file">')(scope));
            
            element.prepend(input);

            function bind() {
                input.bind('change', function(event) {
                    if (typeof event.target.files[0] == 'undefined') return;

                    scope.link.upload(event.target.files[0]).then(function(link) {
                        scope.link.url = link.url;
                        scope.link.id = link.id;

                        scope.onComplete();
                    });
                })
            }

            bind();
        }
    }
}