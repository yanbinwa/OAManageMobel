angular.module('ionicApp', ['ionic', 'ionicApp.controllers', 'ionicApp.services'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/app.html"
    })
    .state('app.main', {
      url: "/main",
      views:{
        'main':{
          templateUrl: "templates/main.html"
        }
      }
    })
    .state('app.main.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: "HomeTabCtrl"
        }
      }
    })
    .state('app.main.checkin', {
      url: "/checkin",
      views: {
        'checkin-tab': {
          templateUrl: "templates/checkin.html",
          controller: 'CheckinTabCtrl'
        }
      }
    })
    .state('app.main.userEmployee', {
      url: "/userEmployee",
      views: {
        'userEmployee-tab': {
          templateUrl: "templates/userEmployee.html",
          controller: 'UserEmployeeTabCtrl'
        }
      }
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",  
      controller: 'LoginTabCtrl'
    })
    .state('sign', {
      url: "/sign",
      templateUrl: "templates/sign.html", 
      controller: 'SignTabCtrl'
    });

  
  $urlRouterProvider.otherwise("/login");

});