var appId = "9204bc2c846b87a279d3b428cf4253da";
var degreeF = false;
var tempInC = 0;

function goLatLong(){
  $.getJSON("https://ipinfo.io?token=80737590be0f1b", function (response) {
  console.log(response);
    var latlong = response.loc.split(",");
    console.log(latlong[0]);
    console.log(latlong[1]);
    $("#mag-weather-city").empty();
    $("#mag-weather-city").append(response.city + " ," + response.country);
    goWeather(latlong[0],latlong[1]);
});
}

function goWeather(lat, long) {
  var weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + appId + "&units=metric";
  $.getJSON(weatherApiUrl, function(data) {
    $("#mag-weather-temperature").empty();
    $("#pressure").empty();
    $("#humidity").empty();
    $("#mag-weather-description").empty();
    $("#mag-weather-temperature").append(data.main.temp);
    $("#pressure").append(data.main.pressure);
    $("#humidity").append(data.main.humidity);
    $("#mag-weather-description").append(data.weather[0].description);
    $("#mag-weather-city").append(" (" + data.name + ")");
    tempInC = data.main.temp;
    updateWeatherIcon(data.weather[0].icon);
  })
};

function updateWeatherIcon(iconURL){
  var localIconPath = 'wi-thermometer';
  switch(iconURL){
    case '01n':
      localIconPath = 'wi-night-clear';
      break;
    case '01d':
      localIconPath = 'wi-day-sunny';
      break;
    case '02d':
      localIconPath = 'wi-day-cloudy';
      break;
    case '02n':
      localIconPath = 'wi-night-alt-cloudy';
      break;
    case '03d':
      localIconPath = 'wi-cloud';
      break;
    case '03n':
      localIconPath = 'wi-cloud';
      break;
    case '04d':
      localIconPath = 'wi-cloudy';
      break;
    case '04n':
      localIconPath = 'wi-cloudy';
      break;
    case '09d':
      localIconPath = 'wi-day-rain-mix';
      break;
    case '09n':
      localIconPath = 'wi-night-alt-showers';
      break;
    case '10d':
      localIconPath = 'wi-day-rain';
      break;
    case '10n':
      localIconPath = 'wi-night-alt-rain-wind';
      break;
    case '11d':
      localIconPath = 'wi-day-storm-showers';
      break;
    case '11n':
      localIconPath = 'wi-night-alt-thunderstorm';
      break;
    case '13d':
      localIconPath = 'wi-snow';
      break;
    case '13n':
      localIconPath = 'wi-snow';
      break;
    case '50d':
      localIconPath = 'wi-dust';
      break;
    case '50n':
      localIconPath = 'wi-dust';
      break;
    
  }
  updateIcon(localIconPath);
}

function updateIcon(iconPath){
  $("#mag-weather-icon").empty();
  $("#mag-weather-icon").append('<i class="wi ' + iconPath + '"></i>')
}

$(document).ready(function() {
  goLatLong();
  $("#mag-temp-unit").val('false');
  $("#mag-temp-unit").change(function(){
    degreeF = $('#mag-temp-unit').is(":checked")
    var newTemp;
    var newUnit;
    if(degreeF){
      newTemp = tempInC * (9/5) + 32; 
      newTemp = newTemp.toFixed(2);
      newUnit = "&deg;F";
    } else{
      newTemp = tempInC;
      newUnit = "&deg;C";
    }
    $("#mag-weather-temperature").empty();
    $("#mag-weather-temperature").append(newTemp);
    $("#mag-weather-unit").empty();
    $("#mag-weather-unit").append(newUnit);
  });
});