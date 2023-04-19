
import * as constants from './constant.js';

constants.form.addEventListener("submit", event => {
    event.preventDefault();
    const city = document.getElementById("city").value;
    getWeatherdata(city);
    document.getElementById("city").value = "";

})

async function getWeatherdata(city) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${constants.API_KEY}`;
    
    const localstorageobject = JSON.parse(localStorage.getItem(city))
    // debugger
    if (localstorageobject) {
        console.log(`Loading weather data for ${city} from localStorage`);
        const data = JSON.parse(localStorage.getItem(city));
        console.log(data);


        displayWeatherdata(data);
    } else {
        console.log(`Fetching weather data for ${city} from API`);
        // debugger
       await fetch(weatherURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem(city, JSON.stringify(data));
                displayWeatherdata(data);
            })

            
    }
}

function displayWeatherdata(data) {

    document.getElementById("city_name").innerHTML = data.name;
    document.getElementById("country").innerHTML = data.sys.country;
    const date = new Date(data.dt * 1000).toLocaleDateString();
    document.getElementById("date").innerHTML = date;
    document.getElementById("temp").innerHTML = Math.round((data.main.temp - 32) * 5 / 9) + " °C";
    document.getElementById("weather").innerHTML = data.weather[0].main;
    document.getElementById("max_temp").innerHTML = Math.round((data.main.temp_max - 32) * 5 / 9) + " °C";
    document.getElementById("min_temp").innerHTML = Math.round((data.main.temp_min - 32) * 5 / 9) + " °C";
    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";
    document.getElementById("humidity").innerHTML = data.main.humidity + " %";
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunrise").innerHTML = sunriseTime + " UTC";
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById("sunset").innerHTML = sunsetTime + " UTC";



    if (data.weather[0].main == "Clouds") {
        constants.weatherIcon.src = "images/clouds.png";
    }
    else if (data.weather[0].main == "Clear") {
        constants.weatherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main == "Rain" || data.weather[0].main == "Thunderstorm") {
        constants.weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        constants.weatherIcon.src = "images/drizzle.png";
    }
    else if (data.weather[0].main == "Mist" || "Haze") {
        constants.weatherIcon.src = "images/mist.png";
    }

}

