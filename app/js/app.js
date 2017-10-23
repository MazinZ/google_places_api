'use strict';

angular
    .module('zenefitsMap', [
      'ngMap', 
      'ui.bootstrap'
    ]);

angular
    .module('zenefitsMap')
    .config(config);

function config($locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}
