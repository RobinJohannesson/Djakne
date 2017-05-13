
// --------------------------------------------------------------
//  Facebook Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var facebookLoginService = function ($http) {

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
					});
				}
			});
		}

		var loginLocal = function(facebookAccessToken) {
			console.log('Sending facebook access token to API: ' + facebookAccessToken);

      // TODO: Send to facebook login route in API and store returned JWT token in localStorage

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

  return {
  	login: login,
  	share: share
  };

};

angular.module('matentusApp')
.factory('facebookLoginService', facebookLoginService);

})();
