
// --------------------------------------------------------------
//  Google Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var googleLoginService = function ($http, $location, $window, adminService, likeService) {

		var api = localStorage.getItem('matentusServer') + '/api';
		
		var isOnline = false;

		var login = function() {
			gapi.load('auth2', function() {
				gapi.auth2.init({
					client_id: '1062166543636-m8nnt9b73m9o566ohuqtrsp32c7dvq5a.apps.googleusercontent.com'
				});
				var GoogleAuth  = gapi.auth2.getAuthInstance();
				GoogleAuth.signIn().then(function(response) {
					loginLocal(response.Zi.access_token);
				});
			});
		}


		var loginLocal = function(googleAccessToken) {
			$http({
				method: 'POST',
				url: api + '/login/google',
				data: {
					googletoken: googleAccessToken
				}
			})
			.then(function(response){
				switch(response.status) {
					case 200:
						console.log("An existing user was logged in with Google.");
						saveToken(response.data.token);
						break;
					case 201:
						console.log("A new user was created and logged in with Google.")
						saveToken(response.data.token);
						break;
					default:
						console.log("Something happened when logging in with Google: " + status);
				}
			})
			.catch(function(error) {
				console.log("Something happened when logging in...");
				console.log(error);
			});
		}

		function saveToken(token) {
			localStorage.setItem('matentustoken', token);
			isOnline = true;
			$location.url('/');
			$window.location.reload();
			likeService.refresh();
			adminService.refresh();
		}

		return {
			login: login,
			isOnline: isOnline
		};

	};
	angular.module('matentusApp')
		.factory('googleLoginService', googleLoginService);

})();