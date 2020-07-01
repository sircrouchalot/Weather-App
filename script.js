var searchEl = $("#city-input");
var searchBtnEl = $("#searchBtn");
var sidebarEl = $("#sidebar");

// Open Weather API Key
var apiKey = "4a0cc259eeb728f4869d3fa09092a3d1";

$(".forecast").hide();

function hasStorage() {
	try {
		localStorage.getItem(i);
		return true;
	} catch (exception) {
		return false;
	}
};

// Creates City Buttons in Search History
function createBtn(city){
    var index = 1;
    var newCity = $("<button class='cityBtn' id=" + city + "' value=" + index + ">");
    newCity.text(city);
    sidebarEl.append(newCity);
    
}

// Loads Current Weather
function loadWeather(city, response){
    var icon = response.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
    console.log(iconURL);

    $("#weatherIcon").attr("src", iconURL);

    $("#current-city").text(city + " " + moment().format("MM/DD/YYYY"));

    $("#temp").text("Temperature: " + response.main.temp + "°F");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#wind").text("Wind Speed (mph): " + response.wind.speed + "mph");

}

// Loads 5 Day Forecast
function loadForecast(response){

    $(".forecast").show();

    for (var i = 1; i <= 5; i++) {
        var day = moment().add(i,'days').format("MM/DD/YYYY");
        var icon = response.list[(i - 1)].weather[0].icon;

        $("#day" + i).text(day);
        $("#icon" + i).attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
        $("#tempforecast" + i).text("Temp: " + response.list[(i - 1)].main.temp + "°F");
        $("#humidityforecast" + i).text("Humidity: " + response.list[(i - 1)].main.humidity + "%");
    }

}

searchBtnEl.on("click", function () {
    
    var city = searchEl.val();
    searchEl.val("");
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    // var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?q=" + city + "&appid=" + apiKey;

    // Request for current weather
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.name);
        city = response.name;

        createBtn(city);
        loadWeather(city, response);

        var cityValue = $("#" + city).attr("value");
        // localStorage.setItem(cityValue, city);

    })

    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        loadForecast(response);
    })

});