
// ------------------------------------------------------------
//  Product Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var adminService = function ($http, $location) {

		var state = {};
		state.suggestions = [];
		getSuggestions();

		function update(product) {
			var url = 'http://localhost:3000/api/products/' + product.id;
			var formData = new FormData();
			for(var key in product) {
				formData.append(key, product[key]);
			}
			$http.put(url, formData, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			});
		}

		function remove(product) {
			$http({
				method: 'DELETE',
				url: 'http://localhost:3000/api/products/' + product.id
			})
			.then(function(response) {
				console.log("adminService removed a product");
			}, errorHandler);
		}

		function getSuggestion(id) {
	        return $http({
	        		method: 'GET', 
	        		url:'http://localhost:3000/api/products/suggestions/' + id
	        	})
	        	.then(function(response) {
					return response.data;	        	
				}, errorHandler)
	        	.catch(function(error) {
	        		console.log(error);
	        	});
	    };

		function getSuggestions() {
			$http({
				method: 'GET',
				url: 'http://localhost:3000/api/products/suggestions'
			})
			.then(function(response) {
				setSuggestions(response.data);
			}, errorHandler);
		}

		function setSuggestions(suggestions) {
			state.suggestions.length = 0;
			state.suggestions.push.apply(state.suggestions, suggestions);
		}

		var errorHandler = function(response) {
			if(response.status === 404) $location.path('/404');
			console.log(response);
		};    

		return {
			suggestions: state.suggestions,
			update: update,
			remove: remove
		};

	};

	angular.module('matentusApp')
	.factory('adminService', adminService);
	
})();
