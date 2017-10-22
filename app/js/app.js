'use strict'

let app_name = 'zenefitsMap';
let app = angular.module(app_name, ['ngMap', 'ui.bootstrap']);
let googleApiKey = 'AIzaSyB4zFI8kyKxdfeVObr9HepKiWxztFZzKRA';

angular.module(app_name)
  .config(['$locationProvider', 
    function($locationProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');

}]);
