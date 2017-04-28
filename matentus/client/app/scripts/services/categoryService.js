
// ------------------------------------------------------------
//  Category Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
  'use strict';

  var categoryService = function ($http) {

    var state = {};
    state.categories = [];
    state.subCategories = [];

    getAllCategories();
    getAllSubCategories();

    function getAllCategories() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/categories'
      })
      .then(function(response) {
        setCategories(response.data);
      }, errorLogger);
    }

    function getAllSubCategories() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/subcategories'
      })
      .then(function(response) {
        console.log(response);
        setSubCategories(response.data);
      }, errorLogger);
    }

    function setCategories(categories) {
      state.categories.length = 0;
      state.categories.push.apply(state.categories, categories);
    }

    function setSubCategories(subCategories) {
      state.subCategories.length = 0;
      state.subCategories.push.apply(state.subCategories, subCategories);
    }

    var errorLogger = function(response) {
      console.log(response);
    };    

    return {
      categories: state.categories,
      subCategories: state.subCategories
    };

  };

  angular.module('matentusApp')
    .factory('categoryService', categoryService);
    
})();
