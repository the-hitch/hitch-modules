module.exports = function(decorator) {
	var moment = require('moment');

	var vendor = function(Account, Amenity, Image, Product, Region, Link, User, Vendor, Faq, Subscription, $injector) {
		this.created_at = new moment(this.created_at);
		this.updated_at = new moment(this.updated_at);

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
			var total = this.products.total;

			this.products = this.products.data.map(function(product) {
				return new Product(product);
			});

			this.products.average = this.products.filter(function(product) {
				return (product.title == "Average Wedding Cost");
			});

			this.products.average = (this.products.average.length ? this.products.average[0] : null);

			this.products.total = total;
		} else {
			this.products = [];
		}
		
		if (this.subscription) {
			this.subscription = new Subscription(this.subscription.data);
		}

		if (this.faqs) {
			var total = this.faqs.total;

			this.faqs = this.faqs.data.map(function(faq) {
				return new Faq(faq);
			});

			this.faqs.total = total;
		} else {
			this.faqs = [];
		}

		if (this.examples) {
			var total = this.examples.total;

			this.examples = this.examples.data.map(function(link) {
				return new Link(link);
			});

			this.examples.total = total;
		} else {
			this.examples = [];
		}

		if (this.downloads) {
			var total = this.downloads.total;
			
			this.downloads = this.downloads.data.map(function(link) {
				return new Link(link);
			});

			this.downloads.total = total;
		} else {
			this.downloads = [];
		}

		if (this.vendors) {
			var total = this.vendors.total;
			
			this.vendors = this.vendors.data.map(function(link) {
				return new Link(link);
			});

			this.vendors.total = total;			
		} else {
			this.vendors = [];
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
			this.terms = this.meta.data.terms || false;
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

		delete this.meta;

		this.excerpt = (this.description || '').replace(/<\/?[^>]+(>|$)/g, "");

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}

	vendor.prototype.transform = function($injector) {

		if (decorator && decorator.prototype.transform) {
			return $injector.invoke(decorator.prototype.transform, this);
		}
	}

	return vendor;
}