
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
		ctrl.id = $routeParams.id;
		ctrl.product = {};
		ctrl.products = productService.products;
		ctrl.filterRelated = filterRelated;
		ctrl.open=open;
		ctrl.loggedIn=false;
		fetchProduct();

		function fetchProduct() { 
		    productService.getProduct(ctrl.id)
		    .then(function(product) { 
				if (!product){
					open();
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
		
		function open(){
			$('#modal-login').modal('show');
		}
		
	}

})();