module.exports = function(extend) {
	var moment = require('moment');

	return function(User, Message) {

		if (extend) {
			angular.extend(this, extend(this))	
		}

		this.created_at = new moment(this.created_at);

		this.address = (function(address) {
			return {
				id: address.id,
				street: address.street,
				postal_code: address.postal_code,
				city: {
					id: address.city.data.id,
					title: address.city.data.title,
					slug: address.city.data.slug,
					region: {
						id: address.city.data.region.data.id,
						title: address.city.data.region.data.title,
						slug: address.city.data.region.data.slug,
						abbr: address.city.data.region.data.abbr,
					}
				}
			}
		})(this.address.data);

		this.meta = this.meta.data;

		if (this.account) {
			this.account = this.account.data;

			this.account.users = (function(users) {
				return users.map(function(user) {
					return new User(user);
				});
			})(this.account.users.data);

			this.account.created_at = new moment(this.account.created_at);
		}

		if (this.analytics) {
			this.analytics = (function(analytics) {

				analytics.thisMonth = {
					sessions: 0,
					views: 0,
					leads: 0,
				}

				for (var i = analytics.length - 1; i >= 0; i--) {
					analytics.thisMonth.sessions += analytics[i].sessions || 0;
					analytics.thisMonth.views += analytics[i].views || 0;
					analytics.thisMonth.leads += analytics[i].leads || 0;
				}

				return analytics;
			})(this.analytics.data);
		}

		if (this.messages) {
			this.messages = (function(messages) {
				return messages.map(function(message) {
					return new Message(message);
				});
			})(this.messages.data);
		}

		return this;
	}
}