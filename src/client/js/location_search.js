// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


function fill_location(latLng, address) {
  console.log('Selected Geolocation : ', latLng, ' has address ', address);
  $('#lat_show').val(latLng.lat);
  $('#lng_show').val(latLng.lng);
  $('#formatted_address').val(address);
}
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 26.2006, lng: 92.9376 },
    zoom: 7.3,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    zoomControl: true
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var geocoder = new google.maps.Geocoder;

  var geocodeLatLng = function(latLng) {
    return new Promise(function (resolve, reject) {
      geocoder.geocode({ 'location': latLng }, function (results, status) {
        var address = '';
        if (status === 'OK') {
          if (results[0]) {
            address = results[0].formatted_address;
          } else {
            reject('No results.');
          }
        } else {
          reject(status);
        }
        resolve(address);
      });
    });
  }

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    input.style.border = '';
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      // markers.push(new google.maps.Marker({
      //   map: map,
      //   icon: icon,
      //   title: place.name,
      //   position: place.geometry.location
      // }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  map.addListener('click', function (e) {
    var latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    input.style.border = '1px green solid';
    notify('Location updated');
    geocodeLatLng(latLng).then((address) => {
      fill_location(latLng, address);
    });
  });
}
