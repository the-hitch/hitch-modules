module.exports = function(decorator) {
	var moment = require('moment');

	return function($injector, Vendor, User, Message) {
		var thread = this;

		this.read = true;
		
		this.subject = this.subject || "(no subject)";

		this.vendor = new Vendor(this.vendor.data);

		this.messages = (function(messages) {
			return messages.map(function(message) {
				if ( ! message.read) {
					thread.read = false;
				}
				
				return new Message(message);
			});
		})((this.messages && this.messages.data) ? this.messages.data : [])
		
		this.excerpt = (this.messages.length ? this.messages[this.messages.length - 1].body.replace(/<\/?[^>]+(>|$)/g, "") : "");

		this.created_at = moment.utc(this.created_at);

		if (decorator) {
			$injector.invoke(decorator, this);
		}

		return this;
	}
}