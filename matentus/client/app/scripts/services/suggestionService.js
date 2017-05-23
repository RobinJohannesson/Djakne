
// ------------------------------------------------------------
//  Suggestion Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var suggestionService = function ($http, productService, adminService) {

		var api = localStorage.getItem('matentusServer') + '/api';

		function addSuggestion(product) {
			var formData = new FormData();
			for(var key in product) {
				formData.append(key, product[key]);
			}
			
			$http({
				method: 'POST',
				url: api + '/products/suggestions',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken'), 'Content-Type': undefined},
				data: formData,
				transformRequest: angular.identity,
			})
			.then(function(response) {
				if(response.status === 201) {
					alert("Tack för ditt förslag!");
				}
				productService.refresh();
				adminService.refresh();
			}, errorHandler);
		}

		var errorHandler = function(response) {
			if(response.status === 404) $location.path('/404');
			console.log(response);
		};    

		return {
			addSuggestion: addSuggestion
		};

	};

	angular.module('matentusApp')
	.factory('suggestionService', suggestionService);
	
})();
