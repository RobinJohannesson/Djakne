
// --------------------------------------------------------------
//  Google Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var googleLoginService = function ($http,$location) {
		var isOnline = false;
		var login = function() {
			gapi.load('auth2', function(){
				gapi.auth2.init({
					client_id: '1062166543636-m8nnt9b73m9o566ohuqtrsp32c7dvq5a.apps.googleusercontent.com'
				});
				var GoogleAuth  = gapi.auth2.getAuthInstance();
				GoogleAuth.signIn().then(function(response){
					$http({
						method: 'POST',
						url: 'http://localhost:3000/api/login/google',
						data: {googletoken: response.Zi.access_token}
					})
						.then(function(response){
							console.log("response from server login: ");
							console.log(response);
							console.log(response.status);

						var status = response.status;
						if (status === 200){
							var token=response.data.token;
							localStorage.setItem('matentustoken', token);
							console.log("Matentus token_ ");
							console.log(localStorage.getItem('matentustoken'));
							$location.url('/');
						}
					})
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