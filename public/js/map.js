var mymap = L.map('map').setView([26.2006, 92.9376], 7.9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.light',
  accessToken: 'pk.eyJ1IjoiYmx1ZWZvZyIsImEiOiJjamIyOXF1bDY4ODM3MndxOGVhY2Nodmd2In0.GKakH77iZRIf1TJuhnKr5Q'
}).addTo(mymap);
