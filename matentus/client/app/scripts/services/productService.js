
// ------------------------------------------------------------
//  Product Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
  'use strict';

  var categoryService = function ($http) {

    var state = {};
    state.categories = [];
    getAllProducts();

    function getAllProducts() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/categories'
      })
      .then(function(response) {
        setCategories(response.data);
      }, errorLogger);
    }

    function setProducts(categories) {
      state.categories.length = 0;
      state.categories.push.apply(state.categories, categories);
    }

    var errorLogger = function(response) {
      console.log(response);
    };    

    return {
      categories: state.categories,
    };

  };

  angular.module('matentusApp')
    .factory('categoryService', categoryService);
    
})();
