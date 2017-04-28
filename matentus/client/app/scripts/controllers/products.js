
// ------------------------------------------------------------
//  Products Controller
// ------------------------------------------------------------
'use strict';
angular.module('matentusApp')
    .controller('ProductsCtrl', ProductsCtrl);


// ------------------------------------------------------------
//  This controller has access to these services
// ------------------------------------------------------------

ProductsCtrl.$inject = ['$routeParams', 'productService', 'categoryService'];


// ------------------------------------------------------------
//  Variables and functions available to "views/products.html"
// ------------------------------------------------------------

function ProductsCtrl($routeParams, productService, categoryService) {
  	var ctrl = this;

	ctrl.currentCategoryId = null;
  	ctrl.currentSubCategoryId = $routeParams.subcategory_id;
  	ctrl.shouldShowCategories = false;

	ctrl.categories = categoryService.categories;
	ctrl.subCategories = categoryService.subCategories;
	ctrl.products = productService.products;

	ctrl.toggleCategories = toggleCategories;
	ctrl.toggleSubCategories = toggleSubCategories;

	function toggleCategories() {
	    ctrl.shouldShowCategories = ctrl.shouldShowCategories ? false : true;
	}

	function toggleSubCategories(id) {
		ctrl.currentCategoryId = (ctrl.currentCategory === id) ? null : id;
	}
}
