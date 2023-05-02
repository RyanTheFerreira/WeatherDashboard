const apiKey = "356a95c45b702fb828c2ea53d5161e34";
var searchButton = document.querySelector("#submit-form");
var nameInputEl = document.querySelector("#city-name");
const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
const maxTableSize = 10;
const cityNamePattern = /^(.+?)(?:, ([a-zA-Z]{2}), ([a-zA-Z]{2}))?$/;

function formSubmitHandler(event) {
    event.preventDefault();
    var value = nameInputEl.value.trim();

    if (cityNamePattern.test(value)){
        var city = value;
        cityLookup(city);
    } else {
        alert("Invalid input")
    }
}


function cityLookup(city) {
    var cityName = city;
    var limit = 1;
    
    const cityIndex = searchHistory.indexof(city);
    if (cityIndex > -1) {
        searchHistory.splice(cityIndex, 1);
    }
}

if (searchHistory.length >= maxTableSize ) {
    searchHistory.pop();

}


