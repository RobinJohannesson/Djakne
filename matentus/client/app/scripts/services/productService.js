
// ------------------------------------------------------------
//  Product Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
  'use strict';

  var productService = function ($http) {

    var state = {};
    state.products = [];
    state.suppliers = [];
    getProducts();
    getSuppliers();

    function getProducts() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/products'
      })
      .then(function(response) {
        setProducts(response.data);
      }, errorLogger);
    }

    function getSuppliers() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/products/suppliers'
      })
      .then(function(response) {
        setSuppliers(response.data);
      }, errorLogger);
    }

    function setProducts(products) {
      state.products.length = 0;
      state.products.push.apply(state.products, products);
    }

    function setSuppliers(suppliers) {
      state.suppliers.length = 0;
      state.suppliers.push.apply(state.suppliers, suppliers);
    }

    var errorLogger = function(response) {
      console.log(response);
    };    

    return {
      products: state.products,
      suppliers: state.suppliers
    };

  };

  angular.module('matentusApp')
    .factory('productService', productService);
    
})();
