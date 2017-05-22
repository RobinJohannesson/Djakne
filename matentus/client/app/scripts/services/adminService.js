
// ------------------------------------------------------------
//  Admin Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var adminService = function ($http, $location, productService, categoryService) {

		var api = localStorage.getItem('matentusServer') + '/api';

		var state = {};
		state.suggestions = [];

		function update(product) {

			var formData = new FormData();
			for(var key in product) {
				formData.append(key, product[key]);
			}
			
			$http({
				method: 'PUT',
				url: api + '/products/' + product.id,
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken'), 'Content-Type': undefined},				
				data: formData,
				transformRequest: angular.identity,
			})
			.then(function(response) {
				refresh();
				productService.refresh();
			})
			.catch(function(error) {
				errorHandler(error);
			});
		}

		function remove(product) {
			$http({
				method: 'DELETE',
				url: api + '/products/' + product.id,
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') }
			})
			.then(function(response) {
				getSuggestions();
				productService.refresh();
			})
			.catch(function(error) {
				errorHandler(error);
			});
		}

		function addProduct(product) {

			var formData = new FormData();
			for(var key in product) {
				formData.append(key, product[key]);
			}
			
			$http({
				method: 'POST',
				url: api + '/products',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken'), 'Content-Type': undefined},
				data: formData,
				transformRequest: angular.identity,
			})
			.then(function(response) {
				productService.refresh();
				refresh();
			}, errorHandler);
		}

		function addCategory(category) {
			$http({
				method: 'POST',
				url: api + '/categories',
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') },
				data: category
			})
			.then(function(response) {
				categoryService.refresh();
			})
			.catch(function(error) {
				errorHandler(error);
			});
		}

		function updateCategory(category) {
			$http({
				method: 'PUT',
				url: api + '/categories/' + category.id,
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') },
				data: category
			})
			.then(function(response) {
				categoryService.refresh();
			})
			.catch(function(error) {
				errorHandler(error);
			});
		}

		function deleteCategory(category) {
			$http({
				method: 'DELETE',
				url: api + '/categories/' + category.id,
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') }
			})
			.then(function(response) {
				categoryService.refresh();
			})
			.catch(function(error) {
				errorHandler(error);
			});
		}

		function getSuggestion(id) {
			return $http({
				method: 'GET', 
				url: api + '/products/suggestions/' + id,
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') }
			})
			.then(function(response) {
				return response.data;
			})
			.catch(function(error) {
				errorHandler(error);
			})
		};

		function getSuggestions() {
			$http({
				method: 'GET',
				url: api + '/products/suggestions',
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') }
			})
			.then(function(response) {
				setSuggestions(response.data);
			})
			.catch(function(error) {
				errorHandler(error);
			});
		}

		function setSuggestions(suggestions) {
			state.suggestions.length = 0;
			state.suggestions.push.apply(state.suggestions, suggestions);

		}

		var errorHandler = function(error) {
			console.log(error.status);
			if(error.status === 404) $location.path('/404');
			//if(error.status === 401) do something
			//console.log(response);
		};    

		function refresh() {
			getSuggestions();
		}
		
		return {
			suggestions: state.suggestions,
			update: update,
			remove: remove,
			addCategory: addCategory,
			updateCategory: updateCategory,
			deleteCategory: deleteCategory,
			addProduct: addProduct,
			refresh: refresh
		};

	};

	angular.module('matentusApp')
	.factory('adminService', adminService);

})();
