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