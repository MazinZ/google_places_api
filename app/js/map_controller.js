app.controller('mapController', ['$scope', 'mapService', 'NgMap',
  function($scope, mapService, NgMap) {

    $scope.placeList = []
    $scope.markers = [];
    
    NgMap.getMap().then(function(map) {
      $scope.map = map;
      $scope.service =  new google.maps.places.PlacesService(map);
    });

    $scope.search = function() {
      deleteMarkers();
      let text = this.getPlace();
      let request = {
        query: text.name
      }

      if (!text) {
        return;
      }

      if ($scope.userLocation) {
        request.location = $scope.userLocation;
        request.radius = 500;
      }

      $scope.service.textSearch(request, searchCallback);
    }

    let searchCallback = function(res, status, pagination) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      $scope.formatResults(res)
      let defaultCenter = $scope.markers[0];
      centerMap(defaultCenter);
      console.log(res)
    }

    $scope.setUserLocation = function() {
      $scope.userLocation = $scope.map.getCenter();
    }

    let centerMap = function(marker) {
      $scope.map.panTo(marker);
      $scope.map.setZoom(13);
    }

    $scope.formatResults = function(res) {
      $scope.placeList = res;
      $scope.markers = createMarkers(res);
      $scope.$apply();
    }

    $scope.openMarkerInfo = function(marker) {
      console.log(marker)
      $scope.selectedMarker = marker;
      $scope.map.showInfoWindow('marker-info', `marker-${marker.id}`);
      centerMap(marker);
    }

    $scope.setActive = function(event, index) {
      $scope.activeItem = index;
      console.log($scope.markers, index);
      let marker = $scope.markers[index];
      $scope.openMarkerInfo(marker);
    }

    let createMarkers = function(places) {
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

    let deleteMarkers = function() {
      $scope.markers = [];
    }

}]);
