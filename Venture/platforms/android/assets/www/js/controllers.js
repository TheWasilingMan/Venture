angular.module('app.controllers', [])
  
.controller('adventuresCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        getAdventures(listAdventures);
        $("#adventures-list").empty();
        function listAdventures(adventuresList) {
            $.each(adventuresList, function (adventuresListIndex, adventure) {
                var tempLength = adventure["length"];
                var length;
                if (tempLength.substring(0, 2) != "00")
                    length = tempLength.substring(0, 2) + " Hr ";
                if (tempLength.substring(3, 5) != "00")
                    length = tempLength.substring(3, 5) + " Min";

                var adventureItemHtml = "<ion-item class='item-icon-right balanced' id='adventures-list-item" + adventuresListIndex
                                        + "' ui-sref='tabsController.venture'>" + adventure["advName"]
                                        + "<i class='icon ion-ios-navigate'></i><div id='adventure" + adventuresListIndex
                                        + "'-details' class='how-list-numbers-and-dots'><p style='margin-top:0px;color:#000000;'><strong>"
                                        + length + "<br>Resources:</strong> " + adventure["resources"] + "</p></div></ion-item>";
                $("#adventures-list").append(adventureItemHtml);
            });
        }
    });

}])

//.controller('ventureCtrl', function($scope, $state, $cordovaGeolocation) {
    //var options = {timeout: 10000, enableHighAccuracy: true};
 
    //$cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    //    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    //    var mapOptions = {
    //        center: latLng,
    //        zoom: 15,
    //        mapTypeId: google.maps.MapTypeId.ROADMAP
    //    };
 
    //    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
    //}, function(error){
    //    console.log("Could not get location");
    //});
//})
   
.controller('ventureCtrl', ['$scope', '$stateParams', '$cordovaGeolocation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaGeolocation) {
    google.maps.event.addDomListener(window, 'load', function() {
        alert("hi" + $cordovaGeolocation);
        var options = { timeout: 10000, enableHighAccuracy: true };

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        }, function (error) {
            console.log("Could not get location");
        });
    });

}])
      
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 