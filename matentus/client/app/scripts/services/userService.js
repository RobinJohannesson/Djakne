
// ------------------------------------------------------------
//  User Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var userService = function ($http, $window) {

		var api = localStorage.getItem('matentusServer') + '/api';

		function getThisUser() {
					return  $http({
						method: 'GET',
						url: api + '/users/me',
						headers: { 'Authorization': 'JWT '+ localStorage.getItem('matentustoken') }
					})
					.then(function(response) {
						return response.data;
					})
					.catch(function(error) {
						errorHandler(error);
					});			
		}

		function updateUserInformation(user) {
            $http({
                method: 'PUT',
                url: api + '/users',
                headers: { 'Authorization':'JWT ' + localStorage.getItem('matentustoken')},               
                data: user,
            })
            .then(function(response) {
               $window.location.reload();
            })
            .catch(function(error) {
                errorHandler(error);
            });
        }

		var errorHandler = function(response) {
			if(response.status === 404) $location.path('/404');
			console.log(response);
		};    

		return {
			getThisUser: getThisUser,
			updateUserInformation: updateUserInformation
		};

	};

	angular.module('matentusApp')
	.factory('userService', userService);
	
})();
