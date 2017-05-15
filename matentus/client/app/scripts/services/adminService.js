
// ------------------------------------------------------------
//  Product Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var adminService = function ($http, $location, productService, categoryService) {

		var state = {};
		state.suggestions = [];
		getSuggestions();

		function update(product) {

			var formData = new FormData();
			for(var key in product) {
				formData.append(key, product[key]);
			}
			
			$http({
				method: 'PUT',
				url: 'http://localhost:3000/api/products',
				data: formData,
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			})
			.then(function(response) {
				refresh();
				productService.refresh();
			}, errorHandler);
		}

		function remove(product) {
			$http({
				method: 'DELETE',
				url: 'http://localhost:3000/api/products/' + product.id
			})
			.then(function(response) {
				getSuggestions();
				productService.refresh();
			}, errorHandler);
		}

		function addCategory(category) {
			$http({
				method: 'POST',
				url: 'http://localhost:3000/api/categories',
				data: category
			})
			.then(function(response) {
				categoryService.refresh();
			}, errorHandler);
		}

		function updateCategory(category) {
			$http({
				method: 'PUT',
				url: 'http://localhost:3000/api/categories',
				data: category
			})
			.then(function(response) {
				categoryService.refresh();
			}, errorHandler);
		}

		function deleteCategory(category) {
			$http({
				method: 'DELETE',
				url: 'http://localhost:3000/api/categories/' + category.id,
			})
			.then(function(response) {
				categoryService.refresh();
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

		var refresh = function() {
			getSuggestions();
		}

		return {
			suggestions: state.suggestions,
			update: update,
			remove: remove,
			addCategory: addCategory,
			updateCategory: updateCategory,
			deleteCategory: deleteCategory,
			refresh: refresh
		};

	};

	angular.module('matentusApp')
	.factory('adminService', adminService);

})();
