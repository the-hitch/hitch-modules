module.exports = function($sce) {
	return function(str) {
		return $sce.trustAsHtml(str);
	}
}