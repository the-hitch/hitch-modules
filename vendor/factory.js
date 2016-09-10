module.exports = function(extend) {
	var moment = require('moment');

	var Vendor = function(User, Message, Account) {

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
			this.account = new Account(this.account.data);
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

	Vendor.prototype.transform = function(config) {
		var vendor = config.data;

		var $injector = angular.injector([
			'ng',
		]);

        var deferred = $injector.get('$q').defer();

		if (vendor.account.payment.cvv) {
	        Stripe.card.createToken({
	            name: vendor.account.payment.name,
	            number: vendor.account.payment.last_4,
	            cvc: vendor.account.payment.cvv,
	            exp_month: vendor.account.payment.expiration.substring(0,2),
	            exp_year: vendor.account.payment.expiration.substring(2,4)
	        }, function(status, response) {
	        	console.log(response);

	        	vendor.fooooooooo = "barrrrrrrrrrrr";

                if (status == 200) {
                	vendor.account.payment = {
                		provider: 'stripe',
                		token: response.id,
                		last_4: response.card.last4,
                		type: response.card.type,
                		name: response.card.name,
                	}

                    deferred.resolve(config);
                } else {
                	
                }
	        });		
		} else {
            deferred.resolve(config);
		}


        return deferred.promise;
	}

	return Vendor;
}