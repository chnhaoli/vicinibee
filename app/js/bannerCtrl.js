// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('BannerCtrl', function ($scope,Dinner) {

    $scope.getNumberOfGuests = function(){
        return Dinner.getNumberOfGuests();
    }
});
