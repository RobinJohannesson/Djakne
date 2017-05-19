
// --------------------------------------------------------------
//  Local Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var localLoginService = function ($http, $location, adminService, likeService) {
		var isOnline = false;
		var isAdmin = false;
        
		var login = function(loginForm) {
			
			$http({
    			method: 'POST',
    			url: 'http://localhost:3000/api/login/email',
    			data: loginForm
    		})
    		.then(function(response){
    		    switch(response.status) {
                    case 200:
                        console.log("An existing user was logged in with email.");
                        saveToken(response.data.token);
                        console.log(response.data.token);
                        break;
                    case 201:
                        console.log("A new user was created and logged in with email.")
                        saveToken(response.data.token);
                        console.log(response.data.token);
                        break;
                    default:
                        console.log("Something happened when logging in with email: " + status);
                }
            })
            .catch(function(error) {
                console.log("Something happened when logging in...");
                console.log(error);
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
                    likeService.refresh();
                    adminService.refresh();
    			}
    		});
		};


        var checkLoginStatus = function() {
            console.log("HEJ");
            if (!localStorage.getItem('matentustoken'))
                isOnline=false;
            else{
                var token=localStorage.getItem('matentustoken');
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/api/login/status',
                    headers: {},
                })
                .then(function(response){
                    var status = response.status;
                    
                    if(status==200){
                        //Dölj login-flikar.
                        
                        if (req.body.userType=="user"){
                            isOnline=true;
                        }
                        
                        if (req.body.userType=="admin"){
                            isOnline=true;
                        }  
                    }
                    else if(status==401){
                        isOnline=false;
                    }
                })
            }
        };
        
        var getUserType = function(){
            console.log(isAdmin);
            return isAdmin;
        };
        
        var getLoginStatus = function(){
            console.log(isOnline);
            return isOnline;
        };

        function saveToken(token) {
            localStorage.setItem('matentustoken', token);
            $location.url('/');
            likeService.refresh();
            adminService.refresh();
        }
        

		return {
			login: login,
			register: register,
            checkLoginStatus: checkLoginStatus,
            getLoginStatus: getLoginStatus,
            getUserType: getUserType
            
		};

	};

	angular.module('matentusApp')
	.factory('localLoginService', localLoginService);
	
})();