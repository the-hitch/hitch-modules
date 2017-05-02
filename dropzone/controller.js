module.exports = function($scope, $animate, $timeout, dropzone) {

    var ctrl = this;

    this.setConfig = function(key, value) {
        this[key] = value;
    }

    this.config = function(key) {
        return this[key];
    }

    this.processDragOverOrEnter = function(event) {
        event.stopPropagation(); event.preventDefault();
        event.dataTransfer.effectAllowed = 'copy';
        
        return false;
    }

    this.dragging = function(dragging) {
        var element = this.element;

        if (dragging) {
            $scope.$evalAsync(function() {
                $animate.addClass(element, 'active')
            });
        } else {
            $scope.$evalAsync(function() {
                $animate.removeClass(element, 'active')
            });
        }
    }

    dropzone.previews = $scope.previews;

    this.select = function(event) {
        event.stopPropagation(); event.preventDefault();

        var file, name, reader, size, type;

        var files = event.target.files || event.dataTransfer.files;

        for (var i = 0; i < files.length; i++) {
            (function(file) {
                reader = new FileReader();
                reader.onload = function(evt) {

                    var image = document.createElement('img');
                    var valid = true;
                    
                    image.addEventListener('load', function() {
                        var preview = {
                            size: function() {
                                return evt.target.result;
                            },
                            url: evt.target.result,
                            draggable: "false",
                            valid: valid,
                            loading: true
                        }

                        if (image.width < parseInt(ctrl.minWidth) || image.height < parseInt(ctrl.minHeight)) {
                            preview.error = "Photos must be at least " + ctrl.minWidth + "px wide and " + ctrl.minHeight + "px tall.";
                        } else if (file.size > 20000000) {
                            preview.error = "Photos must be under 20MB.";
                        }

                        $scope.$evalAsync(function() {
                            $scope.previews.unshift(preview);
                        })

                        if ( ! preview.error) {
                            ctrl.upload({ file: file, preview: preview }).then(function() {
                                preview.loading = false;
                            }, function() {
                                // error
                            }, function(data) {
                                preview.completed = data.complete * 100;
                            })

                            if ($scope.previews.length > 1) {
                                for (var i = 0; i < $scope.previews.length; i++) {
                                    $scope.previews[i].draggable = "true";
                                };
                            }
                        } else {
                            preview.loading = false;
                        }
                    })
                    image.src = evt.target.result;
                }
                reader.readAsDataURL(file);
            })(files[i]);
        }

        return false;
    }
}
