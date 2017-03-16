module.exports = function($rootScope, $compile) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            title: '=',
            add: '&',
            remove: '&?',
            file: '=',
        },
        template: '<div class="file" ng-transclude></div>',
        link: function($scope, $element, attrs) {
            $scope.file = $scope.file || {};

            var input = angular.element('<input name="file" type="file">'),
                label = angular.element('<label class="file__label">Upload File</label>'),
                html = $element.html();
            // $element.append(input);
            // $element.append(label);

            if ($scope.remove) {
                var close = angular.element('<a class="btn btn--small btn--red">Delete</a>');

                close.bind('click', function() {
                    $scope.$evalAsync(function() {
                        $scope.remove({file: $scope.file});
                    });
                });
            }

            function add(name) {
                if (name) {
                    $element.html("<span>" + name + "</span>")
                        .addClass('added')
                        .append(close);
                } else {
                    $element.html("");
                    $element.append(input);
                    $element.append(label);
                    console.log('remove')
                }
            }

            function bind() {
                input.bind('change', function(event) {
                    if (typeof event.target.files[0] == 'undefined') return;

                    add(event.target.files[0].name);

                    $scope.add({ file: event.target.files[0], title: $scope.title }).then(function(file) {
                        $scope.$evalAsync(function() {
                            $scope.file.id = file.id;
                            $scope.file.url = file.url;
                        })
                    })
                })
            }

            $scope.$watch('file', function() {
                if ($scope.file && $scope.file.url) {
                    add(decodeURI($scope.file.url.substring($scope.file.url.lastIndexOf('/') + 1, $scope.file.url.length)));
                } else {
                    add(null);
                }
            })

            bind();
        }
    }
}