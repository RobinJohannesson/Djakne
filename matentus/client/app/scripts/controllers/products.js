
// ------------------------------------------------------------
//  Products Controller
// ------------------------------------------------------------
'use strict';
angular.module('matentusApp')
    .controller('ProductsCtrl', ProductsCtrl);


// ------------------------------------------------------------
//  This controller has access to "services/httpService.js"
// ------------------------------------------------------------

ProductsCtrl.$inject = ['productService', 'categoryService'];


// ------------------------------------------------------------
//  Variables and functions available to "views/products.html"
// ------------------------------------------------------------

function ProductsCtrl(productService, categoryService) {
  	var ctrl = this;
  
	ctrl.categories = categoryService.categories;
	ctrl.subCategories = categoryService.subCategories;
	ctrl.products = productService.products;
	ctrl.toggleCategories = toggleCategories;
	ctrl.shouldShowCategories = false;

	function toggleCategories() {
	    ctrl.shouldShowCategories = ctrl.shouldShowCategories ? false : true;
	}
}
