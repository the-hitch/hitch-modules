module.exports = function() {
	var moment = require('moment');

	var post = function(User, Image, Post) {

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

		if (this.next) {
			this.next = new Post(this.next.data);
		}

		if (this.previous) {
			this.previous = new Post(this.previous.data);
		}

		return this;
	}

	post.prototype.transform = function() {

		if (this.published && this.published_at == null) {
			this.published_at = new moment().format('YYYY-MM-DD HH:mm:00');
		} else if ( ! this.published) {
			this.published_at = null;
		}
	}

	return post;
}