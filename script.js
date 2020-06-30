var searchEl = $("#city-input");
var searchBtnEl = $("#searchBtn");
var sidebarEl = $("#sidebar");

// Open Weather API Key
var apiKey = "4a0cc259eeb728f4869d3fa09092a3d1";

function createBtn(city){
    var newCity = $("<button class='cityBtn' id=" + city +">");
    newCity.text(city);
    sidebarEl.append(newCity);
}

function loadWeather(city, response){
    $("#current-city").text(city);

    $("#temp").text("Temperature: " + response.main.temp + "°F");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#wind").text("Wind Speed (mph): " + response.wind.speed + "mph");
    

}

searchBtnEl.on("click", function () {
    
    var city = searchEl.val();
    searchEl.val("");
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

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

    })
});