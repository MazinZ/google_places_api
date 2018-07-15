(function() {
  angular
      .module('googlePlaces')
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
            vm.placeList = [];
            return err;
          });
      }
    }

    function setUserLocation() {
      vm.userLocation = MapService.instance.map.getCenter();
    }
  }

})();
