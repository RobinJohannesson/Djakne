
// ------------------------------------------------------------
//  Products Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('ProductsCtrl', ProductsCtrl);

	ProductsCtrl.$inject = ['$routeParams', 'productService', 'categoryService','$http'];

	function ProductsCtrl($routeParams, productService, categoryService, $http) {
		var ctrl = this;

		ctrl.currentCategoryId = null;
		ctrl.categoryHeader = 'Kategorier';
		ctrl.currentCategoryTitle = $routeParams.category;
		ctrl.currentCategoryId = $routeParams.category_id;

		ctrl.shouldShowCategories = false;

		ctrl.categories = categoryService.categories;
		ctrl.products = productService.products;

		ctrl.toggleCategories = toggleCategories;

		ctrl.currentOrder = '';
		ctrl.orderBy = orderBy;
		ctrl.like = like;

		orderBy('likeAmount');
        
        ctrl.shouldShowDropdown = false;
		ctrl.toggleDropdown = toggleDropdown;

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
			var token = localStorage.getItem('matentustoken');
			$http({
    			method: 'POST',
    			url: 'http://localhost:3000/api/products/postlike',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')},
    			//data: $.param({productid: id})
				data: {productId: id}
    		})
    		.then(function(response){
    			var status = response.status;
    			if (status==200){
    				console.log("Din like har räknats");
    			}
    		})
			
		}

		function toggleDropdown() {
			ctrl.shouldShowDropdown = ctrl.shouldShowDropdown ? false : true;
		}

	}

})();