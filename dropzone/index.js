angular.module('dropzone', [])

.controller('DropzoneController', require('./controller'))
.service('dropzone', [require('./service')])

.directive('preview', require('./directives/preview'))
.directive('dropzone', require('./directives/dropzone'))
.directive('imgInput', require('./directives/imgInput'))
.directive('instructions', require('./directives/instructions'))