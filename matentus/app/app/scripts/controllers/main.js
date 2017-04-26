'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('app')
  .controller('MainCtrl', function ($routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 localStorage.setItem("authtoken", $routeParams.token);
 console.log(localStorage.getItem("authtoken"));
  });
