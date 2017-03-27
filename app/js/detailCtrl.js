// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DetailCtrl', function ($scope,$routeParams,Dinner) {

    // TODO in Lab 5: you need to get the dish according to the routing parameter
    // $routingParams.paramName
    // Check the app.js to figure out what is the paramName in this case
    $scope.getNumberOfGuests = function() {
        return Dinner.getNumberOfGuests();
    }

    $scope.currentDish = '';

    //API calling
    $scope.isLoading = true;
    $scope.isError = false;

    Dinner.GetDish.get({id:$routeParams.id},function(data){
        $scope.isLoading = false;
        $scope.currentDish = data;
        Dinner.setCurrentDish(data);
    },function(data){
        $scope.isLoading = false;
        $scope.isError = true;
    });

    // Add/remove dish button functioning
    $scope.getButtonLabel = function(){
        return Dinner.isOnMenu($routeParams.id) ? "Remove this dish" : "Add this dish";
    }

    $scope.buttonAction = function(){
        if(Dinner.isOnMenu($routeParams.id)){
            Dinner.removeDish($routeParams.id);
        }
        else{
            Dinner.addDish($routeParams.id);
        }
    }

    $scope.getCurrentPrice = function(){
        return Dinner.getCurrentDish().price * Dinner.getNumberOfGuests();
    }
});
