
// --------------------------------------------------------------
//  Facebook Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var facebookLoginService = function ($http, $window, likeService, adminService) {

		var api = localStorage.getItem('matentusServer') + '/api';

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
					}, {scope: 'email', return_scopes: true});
				}
			});
		}

		var loginLocal = function(facebookAccessToken) {
			$http({
				method: 'POST',
				url: api + '/login/facebook',
				data: {
					fbtoken: facebookAccessToken
				}
			})
			.then(function(response) {
                var isNewUser = false;
                switch(response.status) {
                    case 200:
                        saveToken(response.data.token);
                        break;
                    case 201:
                        saveToken(response.data.token);
                        isNewUser = true;
                        break;
                    default:
                        console.log("Something happened when logging in with Facebook: " + status);
                }
                return isNewUser;
            })
            .then(function(isNewUser) {
                if(isNewUser) {
                    showWelcomeModal();
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
			//$window.location.reload();
			likeService.refresh();
			adminService.refresh();
		}

        function showWelcomeModal() {
            $('#modal-welcome').modal('show');
        }

		return {
			login: login,
			share: share
		};

	};

	angular.module('matentusApp')
	.factory('facebookLoginService', facebookLoginService);

})();
