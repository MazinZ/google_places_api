'use strict'

let app_name = 'zenefitsMap';
let app = angular.module(app_name, ['ngMap', 'ui.bootstrap']);
let googleApiKey = 'AIzaSyB4zFI8kyKxdfeVObr9HepKiWxztFZzKRA'

angular.module(app_name)
  .config(['$locationProvider', 
    function($locationProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');

}]);
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

app.directive('mapSidebar', [function() {
  return {
    restrict: 'EA',
    scope: false,
    link: function(scope, ele, attrs) {
      // scope.activeItem = -1;
      
      // scope.setActive = function(index) {
      //   scope.activeItem = index;
      //   let marker = scope.markers[index]
      //   scope.openMarkerInfo(scope.map, marker)
      // }

      scope.stripAddress = function(address) {
        if (scope.userLocation) {
           return address.split(',')[0]
        }
        return address
      }

    }
    
  };
}])
app.service('mapService', ['$http', function($http) {
  let self = this;

  self.getNearby = function(center, radius, keyword) {
    let url = buildUrl(center, radius, keyword)

    $http({
      method: 'GET',
      url: url
    }).then(function(res) {
      return res
    });
  }

  let buildUrl = function(center, radius, keyword) {
    let baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    let url = baseUrl;

    url += 'location=' + center.latitude + ',' + center.longitude
    url += '&radius=' + radius;
    url += '&keyword=' + keyword;

    return url
  }

}]);
// app.directive('mapsPagination', [function() {
//   return {
//     restrict: 'E',
//     scope: false,
//     template: '<small class="text-muted">Showing results 1 to {{currentCount}}</small><a href="#" ng-click="getNextPage()"> More </a>',    
//     link: function(scope, ele, attrs) {

//       let currentCount = scope.markers.length;

//       scope.getNextPage = function() {
//         let hasNextPage = scope.pagination.hasNextPage;
//         if (!hasNextPage) {
//           return;
//         }
//         console.log(scope.pagination)
//         scope.pagination.nextPage();
//         hasNextPage = scope.pagination.hasNextPage;
//         currentCount += scope.markers.length;
//         // scope.$apply();
//         console.log(currentCount)
//       }
//     }
//   }
// }]);