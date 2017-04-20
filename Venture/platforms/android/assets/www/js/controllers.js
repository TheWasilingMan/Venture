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

.controller('ventureCtrl', function ($scope, $state, $cordovaGeolocation) {
// MAKE MAP
    var locOptions = { timeout: 10000, enableHighAccuracy: true };
    var pos;
    var myMarker;
    var centering = true;
    var mapDrawn = false;
    var geoWatch = $cordovaGeolocation.watchPosition(locOptions)
    geoWatch.then(null,
        function(error) {
            console.log(error);
        },
        function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            pos = { lat, lng };
            if (!mapDrawn) {
                initMap();
                mapDrawn = true;
            }
            else {
                if(centering) {
                    map.panTo(pos);
                }
                myMarker.setPosition(pos);
            }
        }
    );
    //geoWatch.clearWatch();

// MAP FUNCTIONS
    function addYourLocationButton(map, marker) {
        var controlDiv = document.createElement('div');
        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0px';
        firstChild.title = 'Your Location';
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0px 0px';
        secondChild.style.backgroundRepeat = 'no-repeat';
        secondChild.id = 'you_location_img';
        firstChild.appendChild(secondChild);

        google.maps.event.addListener(map, 'dragend', function () {
            $('#you_location_img').css('background-position', '0px 0px');
        });

        firstChild.addEventListener('click', function () {
            var imgX = '0';
            var animationInterval = setInterval(function () {
                if (imgX == '-18') imgX = '0';
                else imgX = '-18';
                $('#you_location_img').css('background-position', imgX + 'px 0px');
            }, 500);
            marker.setPosition(pos);
            map.setCenter(pos);
            clearInterval(animationInterval);
            $('#you_location_img').css('background-position', '-144px 0px');
        });

        controlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: pos,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            disableDefaultUI: true,
            draggable: true
        });
        image = "img/blue-dot.png";
        myMarker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: image,
            position: pos
        });
        addYourLocationButton(map, myMarker);
    }

// ARROW FUNCTIONS
    function getsupportedprop(proparray) {
        var root = document.documentElement;
        for (var i = 0; i < proparray.length; i++) {
            if (proparray[i] in root.style) {
                return proparray[i];
            }
        }
        return false;
    }

    var cssTransform;
    function setArrowRotation(x) {
        if (cssTransform === undefined) {
            cssTransform = getsupportedprop(['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform']);
        }
        x = (x) % 360;
        if (cssTransform) {
            document.getElementById('myarrow').style[cssTransform] = 'rotate(' + x + 'deg)';
        }
    }

    var oriOptions = {
        frequency: 20   // update every 20ms. There is a "filter" option, but it's not supported on android
    };
    var oriWatch = navigator.compass.watchHeading(oriSuccess, oriFailure, oriOptions);

    function oriFailure (error) {
        console.log(error.message)
    }
      
    function oriSuccess(result) {   // updates constantlyy
        var magneticHeading = result.magneticHeading;
        //var trueHeading = result.trueHeading;
        //var accuracy = result.headingAccuracy;
        //var timeStamp = result.timestamp;
        setArrowRotation(magneticHeading);
    }
    //navigator.compass.clearWatch(oriWatch);

    google.maps.event.addListener(map, 'drag', function() { centering = false; } );
    
})
      
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
 