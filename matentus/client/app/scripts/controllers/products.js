
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

		ctrl.currentCategoryTitle = $routeParams.category;
		ctrl.currentCategoryId = $routeParams.category_id;
		ctrl.shouldShowCategories = false;
		ctrl.shouldShowDropdown = false;
		ctrl.currentCategoryId = null;
		ctrl.categoryHeader = 'Kategorier';
		ctrl.currentOrder = '';
		ctrl.userlikes = {};
		
		ctrl.updateLikes = updateLikes;
		ctrl.categories = categoryService.categories;
		ctrl.products = productService.products;
		ctrl.toggleCategories = toggleCategories;
		ctrl.checkUserLike = checkUserLike;
		ctrl.getUserLikes = getUserLikes;
		ctrl.toggleDropdown = toggleDropdown;
		ctrl.orderBy = orderBy;
		ctrl.like = like;
		
		orderBy('likeAmount');
		getUserLikes();

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

		function getUserLikes(){
			$http({
				method: 'GET',
				url: 'http://localhost:3000/api/products/userlikes',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')},
			})
				.then(function(response){
				var status = response.status;
				if (status==200){
					ctrl.userlikes=response;
				}
				else {
					console.log("Fail");
				}
			})

		}

		function checkUserLike (id){
			var currentProductId=id;
			var likes= ctrl.userlikes.data;
			
			for ( var like in likes)
			{
				if(ctrl.userlikes.data[like].product_id===currentProductId){
					return true;
				}
			}
			return false;	
		
		}


		function like(id) {
			console.log("Likes product: " + id);
			var token = localStorage.getItem('matentustoken');
			$http({
				method: 'POST',
				url: 'http://localhost:3000/api/products/postlike',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')},
				data: {productId: id}
			})
				.then(function(response){
				console.log(response);
				var status = response.status;
				if (status==200){
					ctrl.updateLikes();
				}
				else if (status==201){
					ctrl.updateLikes();
				}
				else if (status==401){
					console.log("Du måste logga in för att likea produkter");
				}
			})

		}

		function toggleDropdown() {
			ctrl.shouldShowDropdown = ctrl.shouldShowDropdown ? false : true;
		}

	}

})();