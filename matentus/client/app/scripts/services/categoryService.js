
// ------------------------------------------------------------
//  Category Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var categoryService = function ($http) {

		var api = localStorage.getItem('matentusServer') + '/api';

		var state = {};
		state.categories = [];

		getAllCategories();

		function getAllCategories() {
			$http({
				method: 'GET',
				url: api + '/categories'
			})
			.then(function(response) {
				setCategories(response.data);
			}, errorLogger);
		}

		function setCategories(categories) {
			state.categories.length = 0;
			state.categories.push.apply(state.categories, categories);
		}  

		function refresh() {
			getAllCategories();
		}

		var errorLogger = function(response) {
			console.log(response);
		};  
		
		return {
			categories: state.categories,
			refresh: refresh
		};

	};

	angular.module('matentusApp')
	.factory('categoryService', categoryService);
	
})();
