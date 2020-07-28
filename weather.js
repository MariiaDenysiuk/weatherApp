(function () {
    let x = document.getElementById("doc");
    let temp = document.getElementById("temp");
    let humidity = document.getElementById("humidity");
    let button = document.getElementsByTagName("button");
    let video = document.getElementById("myVideo");
    let max = document.getElementById("max");
    let min = document.getElementById("min");
    let currentTemp = 0;
    var weather = {'Clouds': "./video/cloud.mp4", "Rain": "./video/rain.mp4", "Clear": "./video/sun.mp4"}

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        const link = 'https://fcc-weather-api.glitch.me/' + '/api/current?lat='+position.coords.latitude.toFixed()+'&lon='+position.coords.longitude.toFixed();
        
        fetch(link).then((response) => response.json()).then(
            (response) => {
                const t = response.main.temp;  
                temp.innerHTML = t;
                currentTemp = t;
            
                humidity.innerHTML = response.main.humidity
                max.innerHTML = response.main.temp_max;
                min.innerHTML = response.main.temp_min;

                video.src = weather[response.weather[0].main];
            }
        )
    }

    button[0].addEventListener("click", function(event) {
        temp.innerHTML = currentTemp;  
    });

    button[1].addEventListener("click", function(event) {
        const farang = farangeit(currentTemp);
        temp.innerHTML = farang;
    });

    function farangeit(temp) {
        return (temp * 9/5) + 32;
    }

    getLocation();
})();