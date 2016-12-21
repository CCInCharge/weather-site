var city = "";
var country = "";
var region = "";
var location = "";

function getLocation() {
  $.getJSON('http://ipinfo.io', function(data){
    city = data.city;
    country = data.country;
    region = data.region;
    $("#location").text(city);
  });
}

getLocation();
/*
  if (country != region) {
    location = city + ", " + region + ", " + country;
  } else {
    location = city + ", " + country;
  }
*/
