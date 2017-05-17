
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
    			var status = response.status;
    			if (status === 200) {
    				var token = response.data.token;
    				localStorage.setItem('matentustoken', token);
    				$location.url('/');
    			}
    		});
		};


        var checkLoginStatus = function() {
            if (!localStorage.getItem('matentustoken'))
                return true;
            else{
                var token=localStorage.getItem('matentustoken');
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/api/login/status',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $.param({token: "JWT "+token})
                })
                .then(function(response){
                    var status = response.status;
                    console.log(status);
                //        if (status==0){
                //          return true;
                //        }
                //        else if (status==1){
                //          return false;
                //        }
                })
            }
        };

		return {
			login: login,
			register: register,
            checkLoginStatus: checkLoginStatus
		};

	};

	angular.module('matentusApp')
	.factory('localLoginService', localLoginService);
	
})();