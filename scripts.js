/*
$.get("https://ipinfo.io", function(response) {
  console.log(response.ip, response.country);
}, "jsonp")
*/

function getLocation() {
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
  });
}
/*
function getWeather() {
  var lat = loc[0];
  var lon = loc[1];
  $.getJSON('
  var appid = "78a1ff6ef3713d277bd6d47f094fb816";
}
*/

function getWeather() {
  queryURL = "http://api.wunderground.com/api/066cbf2575a1004c/forecast/conditions/q/" + loc[0] + ".json";
  $.getJSON(queryURL, function(data) {
    weatherData = data;
    console.log(data);
  })
}
