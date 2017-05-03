
// ------------------------------------------------------------
// 	Product Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('ProductCtrl', ProductCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/httpService.js"
// ------------------------------------------------------------

 ProductCtrl.$inject = ['$scope', '$http', '$routeParams'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/product.html"
// ------------------------------------------------------------

function ProductCtrl($scope, $http) {
  var ctrl = this;
    ctrl.postProduct = postProduct;
  // ctrl.test = httpService.categories;
  function postProduct(){
      console.log("test");
      console.log($scope);
      $http({
          method: 'POST',
          url: 'http://localhost:3000/api/products/postproduct',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: {title: $scope.title, description: $scope.desc, subcategory: 1}
      })
      .then(function(response){
          console.log("testarrrr");
      })
  }
}