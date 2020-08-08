let settings = (function() {
    let instance;

    function init() {
        let mainLink = 'https://fcc-weather-api.glitch.me/';

        return {
            domain: function() {
                return mainLink;
            }
        }
    }

    return {
        getInstance: function() {
            if(!instance) {
                instance = init();
            }

            return instance;
        }
    }
})();

let appSettings = settings.getInstance();
