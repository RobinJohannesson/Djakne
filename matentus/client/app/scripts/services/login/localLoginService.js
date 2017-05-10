(function () {
  'use strict';

  var localLoginService = function ($http) {
      var isOnline = false;
      
    var login = function(){
        console.log("local login service");
    };
    return {
      login: login
    };

  };

  angular.module('matentusApp')
    .factory('localLoginService', localLoginService);
    
})();