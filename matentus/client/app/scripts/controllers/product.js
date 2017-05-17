
// ------------------------------------------------------------
//  Product Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('ProductCtrl', ProductCtrl, 'Socialshare');

	ProductCtrl.$inject = ['$routeParams', 'productService'];

	function ProductCtrl($routeParams, productService) {

		var ctrl = this;
		ctrl.id = $routeParams.id;
		ctrl.product = {};
		ctrl.products = productService.products;
		ctrl.filterRelated = filterRelated;
		ctrl.loggedIn = false;

		fetchProduct();
        ctrl.testController = testController;

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
		        
		function testController(Socialshare){
            Socialshare.share({
            'provider': 'facebook',
            'attrs': {
            'socialshareUrl': 'http://google.com'
            }
            })
        }

	}

})();