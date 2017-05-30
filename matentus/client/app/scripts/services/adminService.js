
// ------------------------------------------------------------
//  Admin Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var adminService = function ($http, $location, $window, productService, categoryService, localLoginService) {

		var api = localStorage.getItem('matentusServer') + '/api';

		//------------------------------------------------------------------------
		//	Current data state
		//------------------------------------------------------------------------

		var state = {};
		state.suggestions = [];
		state.users = [];

		//------------------------------------------------------------------------
		//	Manage products and suggestions
		//------------------------------------------------------------------------

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

		function updateProductOrSuggestion(product) {

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

		function deleteProductOrSuggestion(product) {
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
			});
		}

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

		//------------------------------------------------------------------------
		//	Manage categories
		//------------------------------------------------------------------------

		function addCategory(category) {
			if(!category.title) {
				category.title = '-';
			}
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
			if(!category.title) {
				category.title = '-';
			}
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
				productService.refresh();
			})
			.catch(function(error) {
				errorHandler(error);
			});
		}

		//------------------------------------------------------------------------
		//	Manage users
		//------------------------------------------------------------------------

		function updateUser(user) {
			return 	$http({
						method: 'PUT',
						url: api + '/users/' + user.id + '/admin',
						headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') },
						data: user
					})
					.catch(function(error) {
						errorHandler(error);
					});
		}

		function deleteUser(user) {
			$http({
				method: 'DELETE',
				url: api + '/users/' + user.id,
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') }
			})
			.then(function(response) {
				refresh();
			})
			.catch(function(error) {
				errorHandler(error);
			});
		}

		function getAllUsers() {
			$http({
				method: 'GET',
				url: api + '/users',
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') }
			})
			.then(function(response) {
				setUsers(response.data);
			})
			.catch(function(error) {
				errorHandler(error);
			});			
		}


		function getUsersOfProduct(id) {
			$http({
				method: 'GET',
				url: api + '/products/' + id + '/likes',
				headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') }
			})
			.then(function(response) {
				setUsers(response.data);
			})
			.catch(function(error) {
				errorHandler(error);
			});			
		}

		function setUsers(users) {
			state.users.length = 0;
			state.users.push.apply(state.users, users);
		}

		//------------------------------------------------------------------------
		//	General
		//------------------------------------------------------------------------

		var errorHandler = function(error) {
			if(error.status === 404) $location.path('/404');
			if(error.status === 401) $window.location.reload();
		};    

		function refresh() {
			localLoginService.checkAdmin()
			.then(function(isAdmin) {
				if(isAdmin) {
					getSuggestions();
					getAllUsers();
				} else {
					localLoginService.logout();
					showLoginModal();
				}
			});
		}
		
		return {
			users: state.users,
			suggestions: state.suggestions,
			addProduct: addProduct,
			updateProductOrSuggestion: updateProductOrSuggestion,
			deleteProductOrSuggestion: deleteProductOrSuggestion,
			addCategory: addCategory,
			updateCategory: updateCategory,
			deleteCategory: deleteCategory,
			getAllUsers: getAllUsers,
			getUsersOfProduct: getUsersOfProduct,
			updateUser: updateUser,
			refresh: refresh
		};

	};

	angular.module('matentusApp')
	.factory('adminService', adminService);

})();
