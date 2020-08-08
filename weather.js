let TemperatureManager = (function() {
    function TemperatureManager() {};
    TemperatureManager.prototype.farangeit = function(temp) {
        return (temp * 9/5) + 32;
    }
    return TemperatureManager;
}());

let DocumentApi = (function () {
    function DocumentApi() {
        this.doc = document.getElementById("doc");
        this.temp = document.getElementById("temp");
        this.humidity = document.getElementById("humidity");
        this.button = document.getElementsByTagName("button");
        this.video = document.getElementById("myVideo");
        this.max = document.getElementById("max");
        this.min = document.getElementById("min");
    }
    return DocumentApi;
})();

let WeatherApi = (function() {
    let weather = {};
    let documentApi;

    function WeatherApi(documentAp) {
        documentApi = documentAp;
    };

    WeatherApi.prototype.applyWeather = function(type, link) {
        weather[type] = link;
    }

    WeatherApi.prototype.showPosition = function(position) {
        const link = appSettings.domain() + '/api/current?lat='+position.coords.latitude.toFixed()+'&lon='+position.coords.longitude.toFixed();
       
        fetch(link).then((response) => response.json()).then(
            (response) => {
                const t = response.main.temp;  
                documentApi.temp.innerHTML = t;
                documentApi.currentTemp = t;
                documentApi.humidity.innerHTML = response.main.humidity
                documentApi.max.innerHTML = response.main.temp_max;
                documentApi.min.innerHTML = response.main.temp_min;
                documentApi.video.src = weather[response.weather[0].main];
            }
        )
    }
    return WeatherApi;
}());

let LocationManager = (function() {
    let weatherApi;
    function LocationManager(weatherAp) {
       weatherApi = weatherAp;
    }

    LocationManager.prototype.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(weatherApi.showPosition);
        } else {
            doc.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    return LocationManager;
}());

let EventListeners = (function(){
    let documentApi = new DocumentApi();
    let temperatureManager = new TemperatureManager();

    documentApi.button[0].addEventListener("click", function(event) {
        temp.innerHTML = currentTemp;  
    });

    documentApi.button[1].addEventListener("click", function(event) {
        const farang = temperatureManager.farangeit(currentTemp);
        temp.innerHTML = farang;
    });
}());

const doucmentApi1 = new DocumentApi();
const weatherApi1 = new WeatherApi(doucmentApi1);
const location1 = new LocationManager(weatherApi1);
weatherApi1.applyWeather('Clouds',"./video/cloud.mp4");
weatherApi1.applyWeather('Rain',"./video/rain.mp4");
weatherApi1.applyWeather('Clear',"./video/sun.mp4");
location1.getLocation();
