'use strict';

let app_name = 'zenefitsMap';
let app = angular.module(app_name, ['ngMap', 'ui.bootstrap']);

angular.module(app_name)
  .config(['$locationProvider', 
    function($locationProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
}]);
