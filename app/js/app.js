var dinnerPlannerApp = angular.module('dinnerPlanner', ['ngRoute','ngResource','ngCookies','dndLists']);

dinnerPlannerApp.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.
    when('/search', {
        templateUrl: 'partials/searchPartial.html',
    }).
    // TODO in Lab 5: add more conditions for the last two screens (overview and preparation)
    otherwise({
        redirectTo: '/search'
    });
}]);
