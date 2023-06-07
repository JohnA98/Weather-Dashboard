// personal api key 
var apiKey = "631f89f18d8051dc02c91f89896efec8";
// Getting all elements into variables
var locationInputEl = document.querySelector("#location-input");
var searchBtnEl = document.querySelector("#searchBtn");
var cityNameEl = document.querySelector("#city-name");
var todayCardEl = document.querySelector("#weather-day1");
var todayWeatherEl = todayCardEl.children[0];
var weatherForecastEl = document.querySelector(".weather-forecast");
var listGroupEl = document.querySelector(".list-group");

// I put the city of Escondido as it's where I live, and without a default city the site wouldn't work.
localStorage.setItem(
  "Escondido", JSON.stringify({ city: "Escondido", lat:"33.1192", lon: "-117.0864"})
);

// function to get coordinates using openweathermap api
function getLocation() {
  event.preventDefault();
  var cityName = locationInputEl.value;
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      data = data[0];
      console.log("Direct Geolocation Results:");
      console.log(data);
      console.log(`City Name: ${data.name}`);
      console.log(`City Coordinates: ${data.lat}, ${data.lon}`);
      var location = {
        city: data.name,
        lat: data.lat,
        lon: data.lon,
      };

      todayWeather(data.lat, data.lon);
      weatherForecast(data.lat, data.lon);

      // Location data stored to localstorage
      localStorage.setItem(data.name, JSON.stringify(location));
    });
}

// function to get todays weather forecast
function todayWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      var todayWeatherData = {
        city: data.name,
        todayTemp: data.main.temp,
        humidity: data.main.humidity,
        weatherDesc: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
        wind: data.wind.speed, 
      };
      todayWeatherText(todayWeatherData);
    });
}

// gets today time, sets data on page
function todayWeatherText(weatherData) {
  console.log("Todays Weather:");
  console.log(weatherData);

  //Displays City name & todays day & hour
  cityNameEl.textContent = weatherData.city;
  var today = dayjs().format("DD MMM, YYYY");
  var todayHour = dayjs().format("h A");
  todayWeatherEl.textContent = `Weather Today, ${today}, at ${todayHour}`;
  todayWeatherCard(weatherData);
}

// todays weather card
function todayWeatherCard(weatherData) {
  // Create & append new data to todays weather box:
  var weatherContainer = document.createElement("div");
  var weatherTitle = document.createElement("p");
  var tempTitle = document.createElement("p");
  var windText = document.createElement("p");
  var humidityText = document.createElement("p");
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${weatherData.weatherIcon}.png`
  );

  tempTitle.textContent = `Temp: ${weatherData.todayTemp}`;
  windText.textContent = `Wind: ${weatherData.wind}mph`;
  humidityText.textContent = `Humidity: ${weatherData.humidity}%`;

  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(weatherTitle);
  weatherContainer.appendChild(tempTitle);
  weatherContainer.appendChild(windText);
  weatherContainer.appendChild(humidityText);
  todayCardEl.children[0].appendChild(weatherContainer);
}

// gets 5 day forecast
function weatherForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('5 Day Weather Forecast');
      console.log(data);
      var fiveDayForecast = [
        {
          time: dayjs(data.list[2].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[2].main.temp, 
          humidity: data.list[2].main.humidity,
          weatherDesc: data.list[2].weather[0].description,
          weatherIcon: data.list[2].weather[0].icon,
          wind: data.list[2].wind.speed, 
        },
        {
          time: dayjs(data.list[10].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[10].main.temp, 
          humidity: data.list[10].main.humidity,
          weatherDesc: data.list[10].weather[0].description,
          weatherIcon: data.list[10].weather[0].icon,
          wind: data.list[10].wind.speed, //mph
        },
        {
          time: dayjs(data.list[18].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[18].main.temp, 
          humidity: data.list[18].main.humidity,
          weatherDesc: data.list[18].weather[0].description,
          weatherIcon: data.list[18].weather[0].icon,
          wind: data.list[18].wind.speed, 
        },
        {
          time: dayjs(data.list[26].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[26].main.temp, 
          humidity: data.list[26].main.humidity,
          weatherDesc: data.list[26].weather[0].description,
          weatherIcon: data.list[26].weather[0].icon,
          wind: data.list[26].wind.speed, 
        },
        {
          time: dayjs(data.list[34].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[34].main.temp, 
          humidity: data.list[34].main.humidity,
          weatherDesc: data.list[34].weather[0].description,
          weatherIcon: data.list[34].weather[0].icon,
          wind: data.list[34].wind.speed, 
        },
      ];
      for (i = 0; i < fiveDayForecast.length; i++) {
        forecastWeatherCard(fiveDayForecast);
      }
    });
}

// forecast card
function forecastWeatherCard(weatherData) {
  // Create & append new data to today weather box:
  var weatherContainer = document.createElement("div");
  var weatherTitle = document.createElement("p");
  var tempTitle = document.createElement("p");
  var windText = document.createElement("p");
  var humidityText = document.createElement("p");
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${weatherData[i].weatherIcon}.png`
  );

  weatherForecastEl.children[i].children[0].children[0].textContent =
    weatherData[i].time;
  tempTitle.textContent = `Temp: ${weatherData[i].temp}`;
  windText.textContent = `Wind: ${weatherData[i].wind}mph`;
  humidityText.textContent = `Humidity: ${weatherData[i].humidity}%`;

  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(weatherTitle);
  weatherContainer.appendChild(tempTitle);
  weatherContainer.appendChild(windText);
  weatherContainer.appendChild(humidityText);
  weatherForecastEl.children[i].children[0].children[0].appendChild(
    weatherContainer
  );
}

function loadLocalStorage() {
  for (i = 0; i < localStorage.length; i++) {
    var storedCity = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var locationBtnEl = document.createElement("button");
    locationBtnEl.setAttribute(
      "class",
      "btn btn-primary"
    );
    locationBtnEl.textContent = storedCity.city;
    listGroupEl.appendChild(locationBtnEl);
    locationBtnEl.addEventListener("click", () => {
      todayWeather(storedCity.lat, storedCity.lon);
      weatherForecast(storedCity.lat, storedCity.lon);
    });
  }
}

// function to grab default city of Escondido data
function defaultWeather() {
  var storedCity = JSON.parse(localStorage.getItem("Escondido"));
  console.log(storedCity);
  todayWeather(storedCity.lat, storedCity.lon);
  weatherForecast(storedCity.lat, storedCity.lon);
}

defaultWeather();
loadLocalStorage();
searchBtnEl.addEventListener("click", getLocation);