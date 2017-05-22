
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

		ctrl.currentCategoryTitle = $routeParams.category;
		ctrl.currentCategoryId = $routeParams.category_id;
        ctrl.id = $routeParams.id;
		ctrl.shouldShowCategories = false;
		ctrl.shouldShowDropdown = false;
		ctrl.currentCategoryId = null;
		ctrl.categoryHeader = 'Kategorier';
		ctrl.currentOrder = '';

		ctrl.likes = likeService.likes;
		
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
        ctrl.getProductLikes = likeService.getProductLikes;
        ctrl.updateProductLikes = updateProductLikes;
		
		orderBy('likeAmount');
		ctrl.getUserLikes();

		function updateLikes(){
			ctrl.getUserLikes();
		}
        
        function updateProductLikes(id){
            console.log("getProductLikes");
            ctrl.getProductLikes(id)
            .then(function(productlikes){
                ctrl.productlikes = productlikes.length + "";
                return productlikes;
            });
        }
	
		function orderBy(property) {
			ctrl.currentOrder = property;
		}

		function toggleCategories() {
			ctrl.shouldShowCategories = ctrl.shouldShowCategories ? false : true;
		}

		function toggleDropdown() {
			ctrl.shouldShowDropdown = ctrl.shouldShowDropdown ? false : true;
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