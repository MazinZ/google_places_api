(function() {

  app.factory('MapService', MapService);

  MapService.$inject = ['NgMap'];

  function MapService(NgMap) {

    let instance = {};

    return {
      init: init,
      instance: instance,
      center: center,
      createMarkers: createMarkers,
      setZoom: setZoom
    };

    function init() {
      NgMap.getMap().then(function(map) {
        instance.places = new google.maps.places.PlacesService(map);
        instance.map = map;
      });
    }

    function center(marker) {
      instance.map.panTo(marker);
    }
    
    function setZoom(num) {
      instance.map.setZoom(num);
    }

    function createMarkers(places) {
      let markers = places.map(function(place, index) {
        return {
          id: index,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          title: place.name,
          address: place.formatted_address.split(',')
        };
      });

      return markers;
    }
  }

})();
