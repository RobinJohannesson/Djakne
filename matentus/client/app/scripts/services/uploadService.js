
// ------------------------------------------------------------
//  Upload Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var uploadService = function ($http, productService, adminService) {

		var api = localStorage.getItem('matentusServer') + '/api';

		function upload(product) {

			if(!product.approved) {
				product.approved = false;
			}

			var formData = new FormData();
			for(var key in product) {
				formData.append(key, product[key]);
			}
			
			$http({
				method: 'POST',
				url: api + '/products',
				data: formData,
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			})
			.then(function(response) {
				productService.refresh();
				adminService.refresh();
			}, errorHandler);
		}

		var errorHandler = function(response) {
			if(response.status === 404) $location.path('/404');
			console.log(response);
		};    

		return {
			upload: upload
		};

	};

	angular.module('matentusApp')
	.factory('uploadService', uploadService);
	
})();
