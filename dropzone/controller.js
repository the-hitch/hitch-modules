module.exports = function($scope, $animate, $timeout, dropzone) {

    var _self = this;

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
            $timeout(function() {
                $scope.$evalAsync(function() {
                    $animate.removeClass(element, 'active')
                });
            }, 1000);
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
                            draggable: "false",
                            valid: valid,
                            loading: true
                        }

                        if (image.width < parseInt(_self.minWidth) || image.height < parseInt(_self.minHeight)) {
                            preview.error = "This photo is too small! Photos must be at least " + _self.minWidth + "px wide and " + _self.minHeight + "px tall.";
                            preview.loading = false;
                        }

                        if (file.size > 20000000) {
                            preview.error = "Too Large";
                            preview.loading = false;
                            console.error("File too large. Throw error");
                        }

                        $scope.$evalAsync(function() {
                            $scope.previews.unshift(preview);
                        })

                        if ( ! preview.error) {
                            _self.upload({ file: file, preview: preview }).then(function() {
                                preview.loading = false;
                            }, function() {
                                // error
                            }, function(data) {
                                preview.completed = data.complete * 100;
                            })
                        }

                        if ($scope.previews.length > 1) {
                            for (var i = 0; i < $scope.previews.length; i++) {
                                $scope.previews[i].draggable = "true";
                            };
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
