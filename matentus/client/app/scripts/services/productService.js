
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

    function postProduct(){
      console.log($scope);
      console.log($scope.getTheFiles);
      $scope.getTheFiles = function ($files) {
          console.log($files);
      };
      $http({
          method: 'POST',
          url: 'http://localhost:3000/api/products/postproduct',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: $.param({title: $scope.formData.title, description: $scope.formData.desc, subcategoryid: 1, image: $scope.formData.image})
      })
      .then(function(response){
          console.log(response);
      })
  }


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
