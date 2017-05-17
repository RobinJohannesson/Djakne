
// --------------------------------------------------------------
//  Local Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var localLoginService = function ($http, $location) {
		var isOnline = false;
		
		var login = function(loginForm) {
			
			$http({
    			method: 'POST',
    			url: 'http://localhost:3000/api/login/email',
    			data: loginForm
    		})
    		.then(function(response){
    			var status = response.status;
    			if (status === 200){
    				var token = response.data.token;
    				localStorage.setItem('matentustoken', token);
                    console.log("Logged in: " + localStorage.getItem('matentustoken'));
    				$location.url('/');
    			}
    		});
		};

		var register = function(registerForm) {
    		$http({
    			method: 'POST',
    			url: 'http://localhost:3000/api/register/email',
    			data: registerForm
    		})
    		.then(function(response) {
    			console.log(response);
    			var status = response.status;
    			if (status === 200) {
    				var token = response.data.token;
    				localStorage.setItem('matentustoken', token);
    				$location.url('/');
    			}
    		});
		};

		return {
			login: login,
			register: register
		};

	};

	angular.module('matentusApp')
	.factory('localLoginService', localLoginService);
	
})();