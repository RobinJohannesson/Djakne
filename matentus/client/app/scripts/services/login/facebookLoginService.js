
// --------------------------------------------------------------
//  Facebook Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var facebookLoginService = function ($http, $location) {

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
					},{scope:'email', return_scopes:true});
				}
			});
		}

		var loginLocal = function(facebookAccessToken) {
			$http({
    			method: 'POST',
    			url: 'http://localhost:3000/api/login/facebook',
    			data: {fbtoken: facebookAccessToken}
    		})
    		.then(function(response){
    			var status = response.data.status;
    			if (status===0){
    				var token=response.data.token;
    				localStorage.setItem('matentustoken', token);
    				$location.url('/');
    			}
    		})
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
