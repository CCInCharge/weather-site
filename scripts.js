/*
$.get("https://ipinfo.io", function(response) {
  console.log(response.ip, response.country);
}, "jsonp")
*/

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

function getWeather() {
  $.getJSON('https://ipinfo.io', function(data){
    var city = data.city;
    var country = data.country;
    var region = data.region;

    // Get latitude and longitude of current location
    loc = data.loc.split(" ,");

    if (country != region) {
      var location_text = city + ", " + region + ", " + country;
    } else {
      var location_text = city + ", " + country;
    }

    $("#location").text(location_text);

    queryURL = "https://api.wunderground.com/api/066cbf2575a1004c/forecast/conditions/q/" + loc[0] + ".json";
    $.getJSON(queryURL, function(data) {
      curData = data;
      temp_f = data.current_observation.temp_f;
      temp_c = data.current_observation.temp_c;
      var weather = data.current_observation.weather;

      $("#temperature").text(temp_f);
      $("#current-weather").text(weather);
    })
  });
}

$(document).ready(function() {
  getWeather();
  // $(".switch-units").on("click",switchUnits());
})
