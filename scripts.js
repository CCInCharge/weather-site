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

function getLocation(callback) {
  if (!navigator.geolocation) {
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      loc = [position.coords.latitude.toString() + "," +  position.coords.longitude.toString()];
      callback(loc);
    })
  }
}

function getWeather() {
  $.getJSON(getLocation(function(loc){
    alert(loc);
    return "https://api.wunderground.com/api/066cbf2575a1004c/forecast/conditions/q/" + loc[0] + ".json";}), function(data) {
    console.log(data.current_observation);
    curData = data;
    temp_f = data.current_observation.temp_f;
    temp_c = data.current_observation.temp_c;
    var weather = data.current_observation.weather;

    $("#temperature").text(temp_f);
    $("#current-weather").text(weather);
  })
//    queryURL = "https://api.wunderground.com/api/066cbf2575a1004c/forecast/conditions/q/" + loc[0] + ".json";
/*
    $.ajax({
      url: getLocation(function(loc){
        return "https://api.wunderground.com/api/066cbf2575a1004c/forecast/conditions/q/" + loc[0] + ".json";}),
      dataType: 'json',
      success: function(data) {
      temp_f = data.current_observation.temp_f;
      temp_c = data.current_observation.temp_c;
      var weather = data.current_observation.weather;

      $("#temperature").text(temp_f);
      $("#current-weather").text(weather);
    }})
    */
}

$(document).ready(function() {
  getWeather();
  // $(".switch-units").on("click",switchUnits());
})
