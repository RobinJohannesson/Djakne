
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
		ctrl.matentusServer = localStorage.getItem('matentusServer');

		ctrl.currentCategoryTitle = $routeParams.category_title;
		ctrl.currentCategoryId = $routeParams.category_id;
		ctrl.shouldShowCategories = false;
		ctrl.shouldShowSidebar = false;
		ctrl.currentOrder = '';

		ctrl.likes = likeService.likes;
		
		ctrl.categories = categoryService.categories;
		ctrl.products = productService.products;
		ctrl.toggleCategories = toggleCategories;
		ctrl.toggleSidebar = toggleSidebar;
		ctrl.orderBy = orderBy;
		ctrl.likeProduct = likeService.likeProduct;
		ctrl.updateLikes = likeService.updateLikes;
		ctrl.checkUserLike = checkUserLike;
		
		ctrl.likeProduct = likeService.likeProduct;

		orderBy('likeAmount');
		

		function updateLikes(){
			ctrl.getUserLikes();
		}
	
		function orderBy(property) {
			ctrl.currentOrder = property;
		}

		function toggleCategories() {
			ctrl.shouldShowCategories = ctrl.shouldShowCategories ? false : true;
		}

		function toggleSidebar() {
			ctrl.shouldShowSidebar = ctrl.shouldShowSidebar ? false : true;
		}
		
		function checkUserLike (id) {
			var like = ctrl.likes.filter(function(like) {
				return like.product_id === id;
			});

			if(like.length === 0) {
				return false;
			} 
			return true;
		}

	}

})();