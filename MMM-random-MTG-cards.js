Module.register("MMM-random-MTG-cards",{
        defaults: {
            fetchInterval: 1000 * 60 * 21, //in ms, default is 21 min
            searchParam: '' //search param for finer search results (only lands, only standard cards..)
            //TODO: More advanced config options (styling)
        },
        //TODO: Add default image, if no internet connection is available
        cardUrl : "https://c1.scryfall.com/file/scryfall-cards/border_crop/front/1/6/160479a6-e18e-4728-84ca-d9f3a72f48ff.jpg?1562490067",

        notificationReceived(notification, payload, sender) {
            if (notification === 'MODULE_DOM_CREATED') {
                this.getCard();
                setInterval(() => {
                    this.getCard()
                }, this.config.fetchInterval);
            }
        },

        async getCard() {
            this.sendSocketNotification('GET_CARD', "https://api.scryfall.com/cards/random" + this.config.searchParam);
        },

        getDom: function() {
            var bigwrapper = document.createElement("div");
            var cardImg = document.createElement("img");
            cardImg.setAttribute('src', this.cardUrl);

            //TODO: Better style options in config file
            cardImg.setAttribute('style', 'width: 300px');
            bigwrapper.appendChild(cardImg);
            return bigwrapper;
        },

        socketNotificationReceived: function(notification, payload) {
            if (notification === "CARD_RESULT") {
                console.log(payload);
                this.cardUrl = payload;
                this.updateDom();
            }
            this.updateDom();
        }
    });
