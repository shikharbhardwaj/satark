// Display map and set bounds/hover effects.
mapboxgl.accessToken = `pk.eyJ1IjoiYmx1ZWZvZyIsImEiOiJjamIyOXF1bDY4ODM3MndxOG
VhY2Nodmd2In0.GKakH77iZRIf1TJuhnKr5Q`;

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/bluefog/cjf2ymbkt5hom2rqxlvchqjwh',
});

map.setMaxBounds([[86.48300810656485, 22.953297943418278],
                  [99.49317954713797, 29.110667036008394]]);
map.fitBounds([[87.82589836512307, 23.54413240923114],
               [98.37277336512625, 28.536549802883187]]);

map.on('load', function() {
  map.addSource('districts', {
    'type': 'geojson',
    'data': 'js/assam_districts.geojson',
  });

  map.addLayer({
    'id': 'district-fills',
    'type': 'fill',
    'source': 'districts',
    'layout': {},
    'paint': {
      'fill-color': '#F8F4F0',
      'fill-opacity': 0.01,
    },
  });

  map.addLayer({
    'id': 'district-fills-hover',
    'type': 'fill',
    'source': 'districts',
    'layout': {},
    'paint': {
      'fill-color': '#627BC1',
      'fill-opacity': 0.5,
    },
    'filter': ['==', 'DISTRICT', ''],
  });

  map.on('mousemove', 'district-fills', function(e) {
    map.setFilter('district-fills-hover', ['==', 'DISTRICT',
                  e.features[0].properties.DISTRICT]);
  });
});

