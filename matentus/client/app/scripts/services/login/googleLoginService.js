
// --------------------------------------------------------------
//  Google Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var googleLoginService = function ($http) {
		var isOnline = false;

		var login = function() {
			gapi.load('auth2', function(){
				gapi.auth2.init({
					client_id: '1062166543636-m8nnt9b73m9o566ohuqtrsp32c7dvq5a.apps.googleusercontent.com'
				});
				var GoogleAuth  = gapi.auth2.getAuthInstance();
        GoogleAuth.signIn().then(function(response){//request to sign in
        	console.log(response);
        	console.log("Google id token " + response.Zi.id_token);
        	console.log("Google access token " + response.Zi.access_token);
        });
    });
		}

		return {
			login: login,
		};


	};

	angular.module('matentusApp')
	.factory('googleLoginService', googleLoginService);
	
})();