
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

$(document).ready(function() {
    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude.toString();
                lon = position.coords.longitude.toString();
            $.getJSON("https://api.wunderground.com/api/066cbf2575a1004c/forecast/conditions/q/" + lat+ "," + lon + ".json", function(data) {
 //     var curData = data;
      temp_f = data.current_observation.temp_f;
      temp_c = data.current_observation.temp_c;
      city = data.current_observation.observation_location.full;
      weather = data.current_observation.weather;

      $("#current-city").text(city);
      $("#temperature").text(temp_f);
      $("#current-weather").text(weather);
            })
            })
    }
})

