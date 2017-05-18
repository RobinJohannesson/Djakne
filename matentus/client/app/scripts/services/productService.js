
// ------------------------------------------------------------
//  Product Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var productService = function ($http, $location) {

		var state = {};
		state.products = [];
		state.suppliers = [];
		state.keywords = [];
		refresh();

		function getProduct(id) {
	        return $http({
	        		method: 'GET', 
	        		url:'http://localhost:3000/api/products/' + id,
					headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')}
	        	})
	        	.then(function(response) {
					console.log(response);
					return response.data;	        	
				}, errorHandler)
	        	.catch(function(error) {
	        		console.log(error);
	        	});
	    };

		function getProducts() {
			$http({
				method: 'GET',
				url: 'http://localhost:3000/api/products'
			})
			.then(function(response) {
				setProducts(response.data);
			}, errorHandler);
		}

		function getSuppliers() {
			$http({
				method: 'GET',
				url: 'http://localhost:3000/api/products/suppliers'
			})
			.then(function(response) {
				setSuppliers(response.data);
			}, errorHandler);
		}

		function getKeywords() {
			$http({
				method: 'GET',
				url: 'http://localhost:3000/api/products/keywords'
			})
			.then(function(response) {
				setKeywords(response.data);
			}, errorHandler);
		}

		function setProducts(products) {
			state.products.length = 0;
			state.products.push.apply(state.products, products);
		}

		function setSuppliers(suppliers) {
			state.suppliers.length = 0;
			state.suppliers.push.apply(state.suppliers, suppliers);
		}

		function setKeywords(keywords) {
			state.keywords.length = 0;
			state.keywords.push.apply(state.keywords, keywords);
		}
		var errorHandler = function(response) {
			if (response.status==401){
				return null;
			}
			if(response.status === 404) $location.path('/404');
			console.log(response);
		};    

		function refresh() {
			getProducts();

			var matentusToken = localStorage.getItem('matentusToken');
			
			if(matentusToken) {
				getSuppliers();
				getKeywords();
			} else {
				console.log("Logga in för att hämta suppliers och keywords");
			}
		};

		return {
			products: state.products,
			suppliers: state.suppliers,
			keywords: state.keywords,
			getProduct: getProduct,
			refresh: refresh
		};

	};

	angular.module('matentusApp')
	.factory('productService', productService);
	
})();
