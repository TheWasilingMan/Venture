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
    var options = { timeout: 10000, enableHighAccuracy: true };
    var pos;
    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        pos = { lat, lng };
        initMap();
        setArrowRotation(60);
    });

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
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        marker.setPosition(latlng);
                        map.setCenter(latlng);
                        clearInterval(animationInterval);
                        $('#you_location_img').css('background-position', '-144px 0px');
                    });
                }
                else {
                    clearInterval(animationInterval);
                    $('#you_location_img').css('background-position', '0px 0px');
                }
            });

            controlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
        }

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 20,
                center: pos,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                disableDefaultUI: true
            });
            image = "https://d13v9yyemqd5pw.cloudfront.net/assets/map-dot-ha-1ced48ac7ee20ab0a2dd20ba2adaa4fa.png";
            var myMarker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                icon: image,
                position: pos
            });
            addYourLocationButton(map, myMarker);
        }

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
            x = (x - 90) % 360;
            if (cssTransform) {
                document.getElementById('myarrow').style[cssTransform] = 'rotate(' + x + 'deg)';
            }
        }

})
   
//.controller('ventureCtrl', ['$scope', '$stateParams', '$cordovaGeolocation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
//// You can include any angular dependencies as parameters for this function
//// TIP: Access Route Parameters for your page via $stateParams.parameterName
//}])
      
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
 