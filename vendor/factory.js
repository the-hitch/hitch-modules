module.exports = function(decorator) {
	var moment = require('moment');

	var vendor = function(Account, Amenity, Image, Message, Product, Region, Link, User, Vendor, Faq, $injector) {
		this.created_at = new moment(this.created_at);

		if (this.nearby) {
			this.nearby = this.nearby.data.map(function(vendor) {
				return new Vendor(vendor);
			})
		}

		if (this.amenities) {
			this.amenities = this.amenities.data.map(function(amenity) {
				return new Amenity(amenity);
			})			
		}

		if (this.products) {
			this.products = this.products.data.map(function(product) {
				return new Product(product);
			})
		} else {
			this.products = [];
		}

		this.vendors = [];

		if (this.faqs) {
			this.faqs = this.faqs.data.map(function(faq) {
				return new Faq(faq);
			})
		} else {
			this.faqs = [];
		}

		if (this.links) {
			this.links = this.links.data.map(function(link) {
				return new Link(link);
			})
		} else {
			this.links = [];
		}

		if (this.downloads) {
			this.downloads = this.downloads.data.map(function(download) {
				return new Link(download);
			})
		} else {
			this.downloads = [];
		}

		if (this.address) {
			this.address = (function(address) {
				return {
					id: address.id,
					street: address.street,
					postal_code: address.postal_code,
					latitude: address.latitude,
					longitude: address.longitude,
					city: {
						id: address.city.data.id,
						title: address.city.data.title,
						slug: address.city.data.slug,
						region: new Region(address.city.data.region.data)
					}
				}
			})(this.address.data);
		}

		if (this.meta) {
			this.capacity = this.meta.data.capacity || null;
		}

		if (this.account) {
			this.account = new Account(this.account.data);
		}

		if (this.analytics) {
			this.analytics = (function(analytics) {

				analytics.total = {
					sessions: 0,
					views: 0,
					leads: 0,
				}

				for (var i = analytics.length - 1; i >= 0; i--) {
					analytics.total.sessions += analytics[i].sessions || 0;
					analytics.total.views += analytics[i].views || 0;
					analytics.total.leads += analytics[i].leads || 0;
				}

				return analytics;
			})(this.analytics.data);
		}

		if (this.images) {
			var total = this.images.total;

			this.images = this.images.data.map(function(image) {
				return new Image(image);
			});

			this.images.total = total;
		} else {
			this.images = [];
		}

		if (this.messages) {
			this.messages = (function(messages) {
				return messages.map(function(message) {
					return new Message(message);
				});
			})(this.messages.data);
		}

		delete this.meta;

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}

	vendor.prototype.transform = function($injector) {
		delete this.data.created_at;

		if (decorator && decorator.prototype.transform) {
			return $injector.invoke(decorator.prototype.transform, this);
		}
	}

	return vendor;
}