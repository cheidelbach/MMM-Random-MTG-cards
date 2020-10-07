var NodeHelper = require('node_helper');
const request = require('request');
const $ = require('cheerio')

module.exports = NodeHelper.create({

	start: function() {
		console.log("Starting module: " + "random-MTG-cards");
	},

	getCard: function(url) {
		console.log(url);
		request({
			url: url,
			method: 'GET'
		}, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				result = JSON.parse(body);
				this.sendSocketNotification('CARD_RESULT', result.image_uris.border_crop);
			} else {
				console.log('no result');
				//TODO: Send new request, if scryfall API did not respont
			}
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET_CARD') {
			this.getCard(payload);
		}
	}
});
