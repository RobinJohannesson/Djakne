
// ------------------------------------------------------------
// 	Products Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('ProductsCtrl', ProductsCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/httpService.js"
// ------------------------------------------------------------

ProductsCtrl.$inject = ['productService'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/products.html"
// ------------------------------------------------------------

function ProductsCtrl(productService) {
  var ctrl = this;

  ctrl.products = productService.products;

}
