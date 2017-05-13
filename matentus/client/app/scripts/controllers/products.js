
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
	ctrl.categoryHeader = 'Kategorier';
  	ctrl.currentCategoryTitle = $routeParams.category;
  	ctrl.shouldShowCategories = false;

	ctrl.categories = categoryService.categories;
	ctrl.products = productService.products;

	ctrl.toggleCategories = toggleCategories;

	ctrl.currentOrder = '';
	ctrl.orderBy = orderBy;

	orderBy('likeAmount');

	function orderBy(property) {
		ctrl.currentOrder = property;
	}

	function toggleCategories() {
	    ctrl.shouldShowCategories = ctrl.shouldShowCategories ? false : true;
	}

	function updateCategoryHeader() {
		ctrl.categoryHeader = (ctrl.currentCategoryTitle) ? ctrl.currentCategoryTitle : 'Kategorier';
	}

}
