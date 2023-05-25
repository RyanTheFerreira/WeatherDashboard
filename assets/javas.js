const apiKey = "356a95c45b702fb828c2ea53d5161e34";
var searchButton = document.querySelector("#citySearchBtn");
var nameInputEl = document.querySelector("#citySearch");
const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
const maxTableSize = 10;
const cityNamePattern = /^(.+?)(?:, ([a-zA-Z]{2}), ([a-zA-Z]{2}))?$/;

function formSubmitHandler(event) {
    event.preventDefault();
    var value = nameInputEl.value.trim();

    if (cityNamePattern.test(value)) {
        var city = value;
        cityLookup(city);
    } else {
        alert("Invalid input");
    }
}

function displayHistory() {
    const searchHistoryBox = document.querySelector("#city-list");
    searchHistoryBox.innerHTML = "";

    for (var i = 0; i < searchHistory.length; i++) {
        const savedCity = document.createElement("a");
        savedCity.classList = "list-group-item";
        savedCity.setAttribute(
            "href",
            "./index.html?city-name=" + searchHistory[i]
        );
        savedCity.textContent = searchHistory[i];
        savedCity.addEventListener("click", function () {
            cityLookup(searchHistory[i]);
        });

        searchHistoryBox.appendChild(savedCity);
    }
};

function cityLookup(city) {
    var cityName = city;
    var limit = 1;

    const cityIndex = searchHistory.indexOf(city);
    if (cityIndex > -1) {
        searchHistory.splice(cityIndex, 1);
    }

    if (searchHistory.length >= maxTableSize) {
        searchHistory.pop();
    }

    searchHistory.unshift(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    var apiUrl =
        "https://api.openweathermap.org/geo/1.0/direct?q=" +
        cityName +
        "&limit=" +
        limit +
        "&appid=" +
        apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    if (data.length === 0) {
                        alert("Invalid city.");
                        return;
                    } else {
                        displayWeather(data[0].lat, data[0].lon);
                    }
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to OpenWeatherMap: " + error);
        });
    displayHistory();
    nameInputEl.value = "";
}

function displayWeather(lat, lon) {
    var weatherContainerEl = document.querySelector("#weather-container");
    var fiveDayForecastEl = document.querySelector("#forecast-container");
    var citySearchEl = document.querySelector("#city-search-term");
    var weatherBox = document.querySelector("#weather-box");

    weatherContainerEl.innerHTML = "";
    citySearchEl.innerHTML = "";
    fiveDayForecastEl.innerHTML = "";
    weatherBox.style.visibility - "visible"

    const lat = lat;
    const lon = long;

    var apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        "356a95c45b702fb828c2ea53d5161e34";


    //Today
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    const minMaxTemps = getMinMaxTemp(data);

                    const toDay = data.list[0].dt_txt.split(" ")[0];
                    const currentWeatherEl = createWeatherBx(
                        data.list[0],
                        minMaxTemps[toDay]
                    );
                    weatherContainerEl.appendChild(currentWeatherEl);
                    citySearchEl.textContent =
                        data.city.name + ", " + data.city.country;

                    const middayForecast = data.list.filter((item) =>
                        item.dt_txt.includes("12:00:00")
                    );

                    middayForecast.slice(0, 6).forEach((day) => {
                        const date = day.dt_txt.split(" ")[0];
                        const fiveDayForecastWeatherEl = createWeatherBx(
                            day,
                            minMaxTemps[date]
                        );

    //5-day                    
                        fiveDayForecastEl.appendChild(fiveDayForecastWeatherEl);
                    });
                    return;
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("unable to connect to OpenWeatherMap: " + error);
        });
    }

