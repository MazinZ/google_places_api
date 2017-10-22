
app.factory('SearchService', SearchService);

SearchService.$inject = ['$q', 'MapService'];

function SearchService($q, MapService) {

  return {
    textSearch: textSearch,
  };

  function textSearch(text, userLocation) {
    let request = {
      query: text.name
    }

    if (userLocation) {
      request.location = userLocation;
      request.radius = 500;
    }

    let d = $q.defer();
    MapService.instance.places.textSearch(request,
      function(res, status) {
        if (status === 'OK') {
          d.resolve(res)
        }
        else {
          d.reject(status)
        }
      });
      return d.promise;
  }

}