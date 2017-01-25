module.exports = function() {
	var moment = require('moment');

	var post = function(User, Image) {

		if (this.published_at) {
			this.published_at = new moment(this.published_at);
			this.published = true;
		} else {
			this.published = false;
		}

		if (this.images) {
			this.images = this.images.data.map(function(image) {
				return new Image(image);
			});
		} else {
			this.images = [];
		}

		return this;
	}

	post.prototype.transform = function() {
		console.log(this);

		if (this.data.published && this.data.published_at == null) {
			this.data.published_at = new moment();
		} else if ( ! this.data.published) {
			this.data.published_at = null;
		}
	}

	return post;
}