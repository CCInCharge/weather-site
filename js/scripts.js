function switchUnits() {
  if (document.getElementById("units").className == "degF") {
    $("#units").removeClass("degF");
    $("#units").addClass("degC");
    $("#units").html("&deg;C");
    $("#temperature").html(temp_c);
  } else if (document.getElementById("units").className == "degC") {
    $("#units").removeClass("degC");
    $("#units").addClass("degF");
    $("#units").html("&deg;F");
    $("#temperature").html(temp_f);
  }
}

function cbParseData(data) {
  curData = data;
  temp_f = data.current_observation.temp_f;
  temp_c = data.current_observation.temp_c;
  city = data.current_observation.observation_location.full;
  weather = data.current_observation.weather;

  $("#current-city").text(city);
    if (document.getElementById("units").className == "degF") {
        $("#temperature").text(temp_f);
    } else if (document.getElementById("units").className == "degC") {
        $("#temperature").text(temp_c);
    }

  $("#current-weather").text(weather);
  $(".wi").addClass(getWeatherIcon(weather));
}

function cbCallWeatherAPI(position) {
  lat = position.coords.latitude.toString();
  lon = position.coords.longitude.toString();
  $.ajax({
  type: 'GET',
  url: "https://api.wunderground.com/api/066cbf2575a1004c/forecast/conditions/q/" + lat + "," + lon + ".json",
  success: cbParseData
  })
}

function getWeatherLatLon() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbCallWeatherAPI);
  }
}

function getWeatherIcon(weather) {
  if (weather.includes("Rain") || weather.includes("Drizzle") || weather.includes("Spray")) {
      return "wi-rain";
  } else if (weather.includes("Snow")) {
      return "wi-snow";
  } else if (weather.includes("Ice") || weather.includes("Hail")) {
      return "wi-hail";
  } else if (weather.includes("Fog") || weather.includes("Mist") || weather.includes("Haze")) {
      return "wi-fog";
  } else if (weather.includes("Smoke")) {
      return "wi-smoke";
  } else if (weather.includes("Volcanic Ash")) {
      return "wi-volcano";
  } else if (weather.includes("Dust")) {
      return "wi-dust";
  } else if (weather.includes("Sand")) {
      return "wi-sandstorm";
  } else if (weather.includes("Thunderstorm")) {
      return "wi-thunderstorm";
  } else if (weather.includes("Cloud") || weather.includes("Overcast")) {
      return "wi-cloud";
  } else if (weather.includes("Clear")) {
      return "wi-day-sunny";
  } else if (weather.includes("Squalls")) {
      return "wi-windy";
  } else {
      return "wi-na";
  }
}

$(document).ready(getWeatherLatLon());
