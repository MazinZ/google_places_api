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