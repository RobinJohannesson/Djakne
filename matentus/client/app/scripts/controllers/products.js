
// ------------------------------------------------------------
// 	Products Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('ProductsCtrl', ProductsCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/httpService.js"
// ------------------------------------------------------------

ProductsCtrl.$inject = ['httpService'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/products.html"
// ------------------------------------------------------------

function ProductsCtrl(httpService) {
  var ctrl = this;
  ctrl.test = httpService.categories;
}

