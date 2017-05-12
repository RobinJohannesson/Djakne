
// ------------------------------------------------------------
//  Upload Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
  'use strict';

  var uploadService = function ($http) {

      
  	function upload(product) {
  		var url = 'http://localhost:3000/api/products';
  		var formData = new FormData();
  		for(var key in product) {
  			formData.append(key, product[key]);
  		}
  		$http.post(url, formData, {
  			transformRequest: angular.identity,
  			headers: { 'Content-Type': undefined }
  		});
  	}
    return {
      upload: upload
    };

  };

  angular.module('matentusApp')
    .factory('uploadService', uploadService);
    
})();
