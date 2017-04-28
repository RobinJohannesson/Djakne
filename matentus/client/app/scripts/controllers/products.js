
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
  	ctrl.currentSubCategoryId = $routeParams.subcategory_id;
  	ctrl.currentCategoryTitle = $routeParams.category;
  	ctrl.currentSubCategoryTitle = $routeParams.subcategory;
  	ctrl.shouldShowCategories = false;

	ctrl.categories = categoryService.categories;
	ctrl.subCategories = categoryService.subCategories;
	ctrl.products = productService.products;

	ctrl.toggleCategories = toggleCategories;
	ctrl.toggleSubCategories = toggleSubCategories;
	ctrl.sortProductsBy = sortProductsBy;

	updateCategoryHeader();

	function toggleCategories() {
	    ctrl.shouldShowCategories = ctrl.shouldShowCategories ? false : true;
	}

	function toggleSubCategories(id) {
		ctrl.currentCategoryId = (ctrl.currentCategory === id) ? null : id;
	}

	function updateCategoryHeader() {
		ctrl.categoryHeader = (ctrl.currentCategoryTitle && ctrl.currentSubCategoryTitle) ? ctrl.currentCategoryTitle + ' > ' + ctrl.currentSubCategoryTitle : 'Kategorier';
	}

	function sortProductsBy(property) {
		ctrl.products.sort( function (a, b) {
		    if ((typeof b[property] === 'undefined' && typeof a[property] !== 'undefined') || a[property] < b[property]) {
		        return 1;
		    }
		    if ((typeof a[property] === 'undefined' && typeof b[property] !== 'undefined') || a[property] > b[property]) {
		        return -1;
		    }
		    return 0;
		});
	}

}
