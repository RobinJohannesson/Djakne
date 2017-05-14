
// ------------------------------------------------------------
//  Products Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('ProductsCtrl', ProductsCtrl);

	ProductsCtrl.$inject = ['$routeParams', 'productService', 'categoryService'];

	function ProductsCtrl($routeParams, productService, categoryService) {
		var ctrl = this;

		ctrl.currentCategoryId = null;
		ctrl.categoryHeader = 'Kategorier';
		ctrl.currentCategoryTitle = $routeParams.category;
		ctrl.currentCategoryId = $routeParams.category_id;

		console.log("Category title: " + ctrl.currentCategoryTitle);
		console.log("Category id: " + ctrl.currentCategoryId);

		ctrl.shouldShowCategories = false;

		ctrl.categories = categoryService.categories;
		ctrl.products = productService.products;

		ctrl.toggleCategories = toggleCategories;

		ctrl.currentOrder = '';
		ctrl.orderBy = orderBy;
		ctrl.like = like;

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

		function like(id) {
			console.log("Likes product: " + id);
			// TODO: Send like to server
		}

	}

})();