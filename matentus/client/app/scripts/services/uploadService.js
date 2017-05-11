
// ------------------------------------------------------------
//  Product Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
  'use strict';

  var uploadService = function ($http) {

      
  	function upload(data) {
  		var url = 'http://localhost:3000/api/products/upload';
  		var formData = new FormData();
  		for(var key in data) {
  			formData.append(key, data[key]);
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
