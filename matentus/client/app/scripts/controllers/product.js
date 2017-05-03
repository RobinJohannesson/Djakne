
// ------------------------------------------------------------
// 	Product Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('ProductCtrl', ProductCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/httpService.js"
// ------------------------------------------------------------

// ProductCtrl.$inject = [''];

// ------------------------------------------------------------
// 	Variables and functions available to "views/product.html"
// ------------------------------------------------------------

function ProductCtrl() {
  var ctrl = this;
  // ctrl.test = httpService.categories;
  function postProduct(){
    alert("funkar");  
  }
}

