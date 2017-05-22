
// ------------------------------------------------------------
//  Product Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('ProductCtrl', ProductCtrl);

	ProductCtrl.$inject = ['$routeParams', 'productService'];

	function ProductCtrl($routeParams, productService) {

		var ctrl = this;
		ctrl.matentusServer = localStorage.getItem('matentusServer');
		
		ctrl.id = $routeParams.id;
		ctrl.product = {};
		ctrl.products = productService.products;
		ctrl.filterRelated = filterRelated;
		ctrl.loggedIn = false;
        ctrl.facebookshare = facebookshare;

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
        
        function facebookshare(){
            console.log("testar loss");
            window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgoogle.com&amp;src=sdkpreparse', 'newwindow', 'width=500, height=500');
            return false;
        }
	}

})();