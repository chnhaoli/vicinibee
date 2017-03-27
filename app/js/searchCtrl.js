// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope, Dinner) {
    var markers = [];
    var infoWindows = [];

    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.
    var map;
    // Dinner.Dish.get({id:583901})
    // $scope.dataLocal = function(){
    //     var dataL = [];
    //     var dataTemp = Dinner.getDataLocal();
    //     if(dataTemp){
    //         for (key in dataTemp){
    //             var d = {};
    //             d.name = 'Store ' + Math.random().toString(36).substring(7).slice(1,7);
    //             d.address = dataTemp[key].address;
    //             d.product = dataTemp[key].product_name;
    //             d.position = {};
    //             var coord = (dataTemp[key].coordinates).split(", ");
    //             d.position.lat = Number(coord[0]);
    //             d.position.lng = Number(coord[1]);
    //             d.stock = dataTemp[key].in_stock;
    //             d.description = '<h4>'+ d.name + '</h4>' + '<div>'+ d.address +'</div>' + '<div>'+ d.product + ': '+ d.stock +'</div>';
    //             dataL.push(d);
    //             if (key == 5){
    //                 break;
    //             }
    //         }
    //     }
    //     return dataL;
    // }
    $scope.placeData = [];
    // $scope.searchDumb = function(f){
    //     if(f == 'Go Pro Hero 4'){
    //         $scope.initMap();
    //     }
    // }
    $scope.display = function(){
        console.log($scope.placeData);
        return $scope.placeData;
    }
    $scope.initMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: $scope.position
        });
        var marker = new google.maps.Marker({
            position: $scope.position,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10
            },
            map: map
        });
        markers = [];
        infoWindows = [];
        // if($scope.dataLocal()){
        //     var ddd = $scope.dataLocal();
        //     infowindow = new google.maps.InfoWindow();
        //     for (key in ddd){
        //         markers[key] = new google.maps.Marker({
        //             position: ddd[key].position,
        //             map: map
        //         });
        //         markers[key].index = key;
        //         infoWindows[key] = new google.maps.InfoWindow({
        //             content: ddd[key].description
        //         });
        //         google.maps.event.addListener(markers[key], 'click', function() {
        //             infoWindows[this.index].open(map,markers[this.index]);
        //
        //         });
        //     }
        //     $scope.placeData = $scope.dataLocal();
        // }
        $scope.service = new google.maps.places.PlacesService(map);
        // $scope.service.searchNearby(request, callback);
        $scope.searchPlace = function(query){
            var keyword = query;
            if(query == 'hdmi cable'){
                keyword = 'electronics';
            }
            if(query == 'slotted screwdriver'){
                keyword = 'tool shop';
            }
            var request = {
                location : $scope.position,
                radius: 1200,
                keyword: keyword
            }
            $scope.service.nearbySearch(request, function(results, status){
                $scope.pin(results, status);
            });
        }
        $scope.pin = function(results, status){
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: $scope.position
            });
            var marker = new google.maps.Marker({
                position: $scope.position,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10
                },
                map: map
            });
            markers = [];
            infoWindows = [];
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                $scope.placeData = [];
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    place.position = new google.maps.LatLng(place.geometry.viewport.f.f,place.geometry.viewport.b.b);
                    // {
                    //     // lat: place.geometry.viewport.b.b,
                    //     // lng: place.geometry.viewport.f.f
                    //     lat: 15,
                    //     lng: 55
                    // };
                    console.log(place);
                    markers[i] = new google.maps.Marker({
                        position: place.position,
                        map: map
                    });
                    markers[i].index = i;
                    var r = parseInt(Math.random()*10) + 1;
                    var d = parseInt((100 + i*10));
                    place.description = '<h4>'+ place.name + '</h4>' + '<p>' + place.vicinity + ' ~ '+d + ' m</p>' + '<p>' + $scope.search.filter + ': ' + r + ' in stock.' + '</p>';
                    infoWindows[i] = new google.maps.InfoWindow({
                        content: place.description
                    });
                    google.maps.event.addListener(markers[i], 'click', function() {
                        infoWindows[this.index].open(map,markers[this.index]);
                    });
                    var displayData = {}
                    displayData = {
                        name: place.name,
                        address: place.vicinity + ' ~ '+d + ' m',
                        stock: $scope.search.filter + ': ' + r + ' in stock.'
                    }
                    $scope.placeData.push(displayData);
                }
                console.log($scope.placeData);
                $scope.$apply($scope.display());
            }
        }
    }

    $scope.search = {
        filter: '',
        type: ''
    }
    $scope.types = [
        {id:'', name:'All dishes'},
        {id:'appetizer', name:'Appetizer'},
        {id:'beverage', name:'Beverage'},
        {id:'bread', name:'Bread'},
        {id:'breakfast', name:'Breakfast'},
        {id:'dessert', name:'Dessert'},
        {id:'drink', name:'Drink'},
        {id:'main course', name:'Main course'},
        {id:'salad', name:'Salad'},
        {id:'sauce', name:'Sauce'},
        {id:'side dish', name:'Side dish'},
        {id:'soup', name:'Soup'}
    ];
    // $scope.dishes = '';
    // $scope.searchDish = function(query,type) {
    //     // $scope.isLoading = true;
    //     $scope.isError = false;
    //     $scope.dishes = JSON.search(JSON.parse($scope.dataLocal() ? JSON.stringify($scope.dataLocal()) : '{}'), query);
    //     // Dinner.SearchDish.get({query:query,type:type},function(data){
    //     //     $scope.dishes = data.results;
    //     //     $scope.isLoading = false;
    //     // },function(data){
    //     //     $scope.isLoading = false;
    //     //     $scope.isError = true;
    //     // });
    // }
    // $scope.searchDish($scope.search.filter, $scope.search.type);
    if (navigator.geolocation) {
        $scope.isLoading = true;
        navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
                $scope.position = {};
                $scope.position.lat = position.coords.latitude;
                $scope.position.lng = position.coords.longitude;
                console.log(position);
                $scope.isLoading = false;
                $scope.initMap();
            });
        });
    }
});
