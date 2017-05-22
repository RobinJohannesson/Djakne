
// ------------------------------------------------------------
//  Product Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('ProductCtrl', ProductCtrl);

	ProductCtrl.$inject = ['$routeParams', 'productService', 'likeService'];

	function ProductCtrl($routeParams, productService, likeService) {

		var ctrl = this;
		ctrl.matentusServer = localStorage.getItem('matentusServer');
		
		ctrl.id = $routeParams.id;
		ctrl.product = {};
		ctrl.products = productService.products;
		ctrl.filterRelated = filterRelated;
		ctrl.loggedIn = false;
        ctrl.likeProduct = likeService.likeProduct;
        ctrl.facebookshare = facebookshare;
        ctrl.checkUserLike = checkUserLike;
        ctrl.likes = likeService.likes;

		fetchProduct();

		function fetchProduct() { 
		    productService.getProduct(ctrl.id)
		    .then(function(product) { 
				if (!product){
					showLoginModal();
				}
				else{
					ctrl.product = product;
					ctrl.loggedIn=true;	
				}
		    });
		 }

		 function filterRelated(product) {
		 	return product.supplier === ctrl.product.supplier || product.keyword === ctrl.product.keyword;
		 }

		
		function showLoginModal(){
			$('#modal-login').modal('show');
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
        
        function facebookshare(){
            console.log("testar loss");
            window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgoogle.com&amp;src=sdkpreparse', 'newwindow', 'width=500, height=500');
            return false;
        }
	}

})();