var cities = [];

document.getElementById("search-button").addEventListener("click", function() {
  var city = document.getElementById("city-input").value;
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("city-" + city, city);
    addCityButton(city);
  }
});

function addCityButton(city) {
  var cityButtons = document.getElementById("city-buttons");
  var button = document.createElement("button");
  button.classList.add("btn", "btn-info", "mt-2", "mr-2");
  button.innerHTML = city;
  cityButtons.appendChild(button);
}

for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  if (key.startsWith("city-")) {
    var city = localStorage.getItem(key);
    if (!cities.includes(city)) {
      cities.push(city);
      addCityButton(city);
    }
  }
}

document.getElementById("search-button").addEventListener("click", function() {
  var city = document.getElementById("city-input").value;
fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&appid=49fa224f15712dee6ff28a1ea4ab4495")
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    });
  });
  function displayWeatherData(data) {
    var weatherData = document.getElementById("weather-data");
    weatherData.innerHTML = ""; // clear previous data
    // add new data
    if (data && data.city && data.city.name) {
      var cityName = data.city.name;
      weatherData.innerHTML += "<h2>Weather in " + cityName + "</h2>";
      for (var i = 0; i < data.list.length; i++) {
        var temperature = (data.list[0].main.temp - 273.15).toFixed(1); // convert from Kelvin to Celsius
        var humidity = data.list[i].main.humidity;
        var windSpeed = data.list[i].wind.speed;
        weatherData.innerHTML += "<div class='weather-box'>";
        weatherData.innerHTML += "<h3>Day " + (i + 1) + "</h3>";
        weatherData.innerHTML += "Temperature: " + temperature + " &#8451;<br>Humidity: " + humidity + " %<br>Wind Speed: " + windSpeed + " m/s<br><br>";
        weatherData.innerHTML += "</div>";
      }
    } else {
      console.error("Data or its properties are undefined");
    }
  }
  
    
    document.body.addEventListener("click", function(event) {
      if (event.target.classList.contains("city-button")) {
        var city = event.target.textContent;
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&appid=49fa224f15712dee6ff28a1ea4ab4495")
          .then(response => response.json())
          .then(data => displayWeatherData(data))
          .catch(error => console.error(error));
      }
    });
    
    
  
  