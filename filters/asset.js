module.exports = function(config, $sce) {
	return function(path) {
		return $sce.trustAsResourceUrl(config.assets.host + '/assets' + path);
	}
}