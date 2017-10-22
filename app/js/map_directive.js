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