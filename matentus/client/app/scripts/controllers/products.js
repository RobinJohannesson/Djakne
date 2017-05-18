
// ------------------------------------------------------------
//  Products Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
		.controller('ProductsCtrl', ProductsCtrl);

	ProductsCtrl.$inject = ['$routeParams', 'productService', 'categoryService','likeService'];

	function ProductsCtrl($routeParams, productService, categoryService, likeService) {
		var ctrl = this;

		ctrl.currentCategoryTitle = $routeParams.category;
		ctrl.currentCategoryId = $routeParams.category_id;
		ctrl.shouldShowCategories = false;
		ctrl.shouldShowDropdown = false;
		ctrl.currentCategoryId = null;
		ctrl.categoryHeader = 'Kategorier';
		ctrl.currentOrder = '';

		ctrl.userlikes = likeService.userLikes;
		
		
		ctrl.categories = categoryService.categories;
		ctrl.products = productService.products;
		ctrl.toggleCategories = toggleCategories;
		ctrl.toggleDropdown = toggleDropdown;
		ctrl.orderBy = orderBy;
		ctrl.likeProduct = likeService.likeProduct;
		ctrl.updateLikes = likeService.updateLikes;
		ctrl.checkUserLike = checkUserLike;
		ctrl.getUserLikes = likeService.getUserLikes;
		ctrl.likeProduct = likeService.likeProduct;
		
		orderBy('likeAmount');
		ctrl.getUserLikes();

		function updateLikes(){
			ctrl.getUserLikes();
		}
	
		function orderBy(property) {
			ctrl.currentOrder = property;
		}

		function toggleCategories() {
			ctrl.shouldShowCategories = ctrl.shouldShowCategories ? false : true;
		}

		function updateCategoryHeader() {
			ctrl.categoryHeader = (ctrl.currentCategoryTitle) ? ctrl.currentCategoryTitle : 'Kategorier';
		}

		function toggleDropdown() {
			ctrl.shouldShowDropdown = ctrl.shouldShowDropdown ? false : true;
		}

		function checkUserLike (id){
			// var currentProductId = id;
			// var likes= ctrl.userlikes.data;
			
			// for ( var like in likes)
			// {
			// 	if(ctrl.userlikes.data[like].product_id===currentProductId){
			// 		return true;
			// 	}
			// }
			return false;	
		
		}

	}

})();