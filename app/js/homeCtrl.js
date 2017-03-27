// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('HomeCtrl', function ($scope,Dinner) {

    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.

    // Dinner.Dish.get({id:583901})
    $scope.models = {
        selected: null,
        lists: {"A": [], "B": ['b']}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
});
