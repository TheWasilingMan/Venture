angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.adventures', {
    url: '/page2',
    views: {
      'tab4': {
        templateUrl: 'templates/adventures.html',
        controller: 'adventuresCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.navigate'
      2) Using $state.go programatically:
        $state.go('tabsController.navigate');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page3
      /page1/tab3/page3
  */
  .state('tabsController.navigate', {
    url: '/page3',
    views: {
      'tab4': {
        templateUrl: 'templates/navigate.html',
        controller: 'navigateCtrl'
      },
      'tab3': {
        templateUrl: 'templates/navigate.html',
        controller: 'navigateCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/page2')

  

});