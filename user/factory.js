module.exports = function(decorator) {

	var user =  function(Vendor, Account, MessageThread, $injector) {
		var moment = require('moment');

		if (this.favorites) {
			this.favorites = this.favorites.data.map(function(favorite) {
				return new Vendor(favorite);
			});
		} else {
			this.favorites = [];
		}

		if (this.vendors) {
			this.vendors = this.vendors.data.map(function(vendor) {
				return new Vendor(vendor);
			});
		}

		if (this.account) {
			this.account = new Account(this.account.data);
		}

		this.created_at = new moment(this.created_at);

        if (this.messages) {
            this.messages = (function(messages) {
                return messages.map(function(message) {
                    return new MessageThread(message);
                });
            })(this.messages.data);
        }

		if (decorator) {
			angular.extend(this, $injector.invoke(decorator, this));	
		}

		return this;
	}

	return user;
}