'use strict';

(function() {
  angular
      .module('googlePlaces', [
        'ngMap', 
        'ui.bootstrap'
      ]);

  angular
      .module('googlePlaces')
      .config(config);

  function config($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }

})();
