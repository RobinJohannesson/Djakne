'use strict';

angular
  .module('matentusApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'ctrl'      
      })
      .otherwise({
        redirectTo: '/'
      });


  }]);