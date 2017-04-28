
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
	ctrl.toggleSubCategories = toggleSubCategories;
	ctrl.shouldShowCategories = false;
	ctrl.currentCategory = null;

	function toggleCategories() {
	    ctrl.shouldShowCategories = ctrl.shouldShowCategories ? false : true;
	}

	function toggleSubCategories(id) {
		ctrl.currentCategory = (ctrl.currentCategory === id) ? null : id;
		console.log(ctrl.currentCategory);
	}
}
