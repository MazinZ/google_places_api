'use strict';

angular
    .module('zenefitsMap', [
      'ngMap', 
      'ui.bootstrap'
    ]);

angular
    .module('zenefitsMap')
    .config(config);

function config($locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}

(function() {
  angular
      .module('zenefitsMap')
      .controller('MapController', MapController);

  MapController.$inject = ['MapService', 'SearchService'];

  function MapController(MapService, SearchService) {

    let vm = this;
    vm.placeList = [];
    vm.markers = [];

    vm.openMarkerInfo = openMarkerInfo;
    vm.onCloseMarker = onCloseMarker;
    vm.search = search;
    vm.setActive = setActive;
    vm.setMapLoaded = setMapLoaded;
    vm.setUserLocation = setUserLocation;

    MapService.init();

    function onCloseMarker() {
      vm.activeItem = null;
    }

    function openMarkerInfo(marker) {
      vm.selectedMarker = marker;
      MapService.instance.map.showInfoWindow('marker-info', `marker-${marker.id}`);
      MapService.center(marker);
    }

    function setActive(event, index) {
      let marker = vm.markers[index];
      vm.activeItem = index;
      vm.openMarkerInfo(marker);
    }

    function setMapLoaded() {
      vm.mapLoaded = true;
    }

    function search() {
      let text = this.getPlace();
      if (text.name) {
        vm.markers = [];
        SearchService.textSearch(text, vm.userLocation)
          .then(function(res) {
            vm.placeList = res;
            vm.markers = MapService.createMarkers(res);
            MapService.center(vm.markers[0]);
            MapService.setZoom(13);
          }, function(err){
            return err;
          });
      }
    }

    function setUserLocation() {
      vm.userLocation = MapService.instance.map.getCenter();
    }
  }

})();

(function() {
  angular
      .module('zenefitsMap')
      .factory('MapService', MapService);

  MapService.$inject = ['NgMap'];

  function MapService(NgMap) {

    let instance = {};

    return {
      center: center,
      createMarkers: createMarkers,
      init: init,
      instance: instance,
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

(function() {
  angular
      .module('zenefitsMap')
      .factory('SearchService', SearchService);

  SearchService.$inject = ['$q', 'MapService'];

  function SearchService($q, MapService) {

    return {
      textSearch: textSearch,
    };

    function textSearch(text, userLocation) {
      let request = {
        query: text.name
      };
      if (userLocation) {
        request.location = userLocation;
        request.radius = 500;
      }
      let d = $q.defer();
      MapService.instance.places.textSearch(request,
        function(res, status) {
          if (status === 'OK') {
            d.resolve(res);
          }
          else {
            d.reject(status);
          }
        });

        return d.promise;
    }
  }

})();
