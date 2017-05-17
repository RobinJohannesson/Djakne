
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
		
		fetchProduct();

		function fetchProduct() { 
		    productService.getProduct(ctrl.id)
		    .then(function(product) { 
		    	ctrl.product = product; 
		    }); 
		 }

		 function filterRelated(product) {
		 	return product.supplier === ctrl.product.supplier || product.keyword === ctrl.product.keyword;
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