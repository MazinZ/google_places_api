app.controller('MapController', MapController);

MapController.$inject = ['MapService', 'SearchService'];

function MapController(MapService, SearchService) {

  let vm = this;
  
  vm.placeList = [];
  vm.markers = [];
  vm.userLocation;

  MapService.init();

  vm.openMarkerInfo = function(marker) {
    vm.selectedMarker = marker;
    MapService.instance.map.showInfoWindow('marker-info', `marker-${marker.id}`);
    MapService.center(marker);
  }

  vm.setActive = function(event, index) {
    let marker = vm.markers[index];
    vm.activeItem = index;
    vm.openMarkerInfo(marker);
  }

  vm.search = function() {
    vm.markers = [];
    let text = this.getPlace();
    if (text) {
      SearchService.textSearch(text, vm.userLocation)
        .then(function(res) {
          vm.placeList = res;
          vm.markers = MapService.createMarkers(res)
          MapService.center(vm.markers[0]);
      })
    }
  }

  vm.setUserLocation = function() {
    vm.userLocation = MapService.instance.map.getCenter();
  }

}
