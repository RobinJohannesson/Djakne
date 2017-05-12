
// ------------------------------------------------------------
//  Product Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
  'use strict';

  var productService = function ($http) {

    var state = {};
    state.products = [];
    getProducts();

    function getProducts() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/products'
      })
      .then(function(response) {
        setProducts(response.data);
      }, errorLogger);
    }

    function setProducts(products) {
      state.products.length = 0;
      state.products.push.apply(state.products, products);
    }

    var errorLogger = function(response) {
      console.log(response);
    };    

    return {
      products: state.products
    };

  };

  angular.module('matentusApp')
    .factory('productService', productService);
    
})();
