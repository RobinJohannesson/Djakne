(function () {
  'use strict';
  var httpService = function ($http) {

    var state = {};
    state.categories = [];
    getAllCategories();


    function getAllCategories() {

      $http({
        method: 'GET',
        url: '/api/categories'
      }).then(function successCallback(response) {
        state.categories.length = 0;
        state.categories.push.apply(state.categories, response.data);
        }, errorLogger);
    };

    var errorLogger = function(response) {
      console.log(response);
    };    

    return {
      categories: state.categories,
    };

  };

  angular.module('matentusApp')
    .factory('httpService', httpService);
    
})();
