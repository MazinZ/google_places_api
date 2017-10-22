app.factory('MapService', MapService);

MapService.$inject = ['NgMap'];

function MapService(NgMap) {

  let instance = {}

  return {
    init: init,
    instance: instance,
    center: center,
    createMarkers: createMarkers
  };

  function init() {
    NgMap.getMap().then(function(map) {
      instance.places = new google.maps.places.PlacesService(map);
      instance.map = map;
    });
  }

  function center(marker) {
    instance.map.panTo(marker);
    instance.map.setZoom(13);
  }

  function createMarkers(places) {
    let markers = places.map(function(place, index) {
      return {
        id: index,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        title: place.name,
        address: place.formatted_address.split(',')
      }
    });

    return markers;
  }

}


