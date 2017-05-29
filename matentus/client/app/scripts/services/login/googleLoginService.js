
// --------------------------------------------------------------
//  Google Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var googleLoginService = function ($http, $window, adminService, likeService) {

		var api = localStorage.getItem('matentusServer') + '/api';
		
		var login = function() {
			 gapi.load('auth2', function() {
						gapi.auth2.init({
							client_id: '1062166543636-m8nnt9b73m9o566ohuqtrsp32c7dvq5a.apps.googleusercontent.com'
						})
						.then(function() {
							var GoogleAuth  = gapi.auth2.getAuthInstance();
							GoogleAuth.signIn()
							.then(function(response) {
								loginLocal(response.Zi.access_token);
							});
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
			.then(function(response) {
                var isNewUser = false;
                switch(response.status) {
                    case 200:
                        saveToken(response.data.token, isNewUser);
                        break;
                    case 201:
                    	isNewUser = true;
                        saveToken(response.data.token, isNewUser);
                        break;
                    default:
                        console.log("Something happened when logging in with Google: " + status);
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

        function saveToken(token, isNewUser) {
            localStorage.setItem('matentustoken', token);
            likeService.refresh();
            if(!isNewUser) {
                $window.location.reload();
            }
        }

        function showWelcomeModal(){
            $('#modal-welcome').modal('show');
        }

		return {
			login: login
		};

	};
	angular.module('matentusApp')
		.factory('googleLoginService', googleLoginService);

})();