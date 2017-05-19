
// --------------------------------------------------------------
//  Facebook Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var facebookLoginService = function ($http, $location, likeService, adminService) {


		var isOnline = false;

		var login = function() {
			FB.getLoginStatus(function(response) {
				if (response.authResponse && response.status === 'connected') {
					loginLocal(response.authResponse.accessToken);
				}
				else {
					FB.login(function(response) {
						if(response.authResponse) {
							loginLocal(response.authResponse.accessToken);
						}
					}, {scope:'email', return_scopes:true});
				}
			});
		}

		var loginLocal = function(facebookAccessToken) {
			$http({
				method: 'POST',
				url: 'http://localhost:3000/api/login/facebook',
				data: {
					fbtoken: facebookAccessToken
				}
			})
			.then(function(response){
				switch(response.status) {
					case 200:
						console.log("An existing user was logged in with Facebook.");
						saveToken(response.data.token);
						break;
					case 201:
						console.log("A new user was created and logged in with Facebook.")
						saveToken(response.data.token);
						break;
					default:
						console.log("Something happened when logging in with Facebook: " + status);
				}
			})
			.catch(function(error) {
				console.log("Something happened when logging in...");
				console.log(error);
			});
		}

		var share = function() {
			FB.ui(
			{
				method: 'share',
				href: 'https://developers.facebook.com/docs/'
			}, function(response){
				console.log(response);
			});
		}

		function saveToken(token) {
			localStorage.setItem('matentustoken', token);
			$location.url('/');
			likeService.refresh();
			adminService.refresh();
		}

		return {
			login: login,
			share: share
		};

	};

	angular.module('matentusApp')
	.factory('facebookLoginService', facebookLoginService);

})();
