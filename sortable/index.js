angular.module('sortable', [])

.directive('sortable', [function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var children = element.children();
			var styles = window.getComputedStyle(element[0]);
			var originPosition = styles.position;
			var clone;

			var parentStyles = window.getComputedStyle(element.parent()[0]);

			if (parentStyles.position == 'static') {
				element.parent()[0].style.position = "relative";
			}

			while (children.length) {
				angular.forEach(children, function(child) {
					if (child.tagName == "IMG") {
						child.setAttribute('draggable', false);
					}
				});

				children = children.children();
			}

			element.bind('dragstart', function() {
				clone = element.clone();
				clone[0].style.visibility = 'hidden';
				element.after(clone);

				var left = element[0].offsetLeft + "px"
				var top = element[0].offsetTop + "px"

				element[0].style.position = 'absolute';
				element[0].style.left = left;
				element[0].style.top = top;

			})

			element.bind('drag', function(e) {
				// console.log(e.originalEvent);
				// console.log(e.originalEvent.offsetX);
				// element[0].style.left = e.originalEvent.offsetX + "px";
				// element[0].style.top = e.originalEvent.offsetY + "px";
				// element[0].style.position = styles.position;

			})

			element.bind('dragend', function() {
				console.log(originPosition)
				element[0].style.position = originPosition;
				element[0].style.left = 0;
				element[0].style.top = 0;
				// element[0].style.position = "relative";

				clone.remove()
			})

		}
	}
}])