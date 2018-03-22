mapboxgl.accessToken = 'pk.eyJ1IjoiYmx1ZWZvZyIsImEiOiJjamIyOXF1bDY4ODM3MndxOGVhY2Nodmd2In0.GKakH77iZRIf1TJuhnKr5Q';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/bluefog/cjf2ymbkt5hom2rqxlvchqjwh'
}).fitBounds([[89.25986090216082, 24.725585673509542], [99.27509720416606, 27.40083290150899]]);
