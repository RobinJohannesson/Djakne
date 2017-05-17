// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService', '$scope', '$http', '$location'];

	function LoginCtrl(facebookLoginService, googleLoginService, localLoginService, $scope, $http, $location) {

		var ctrl = this;
		ctrl.loginFacebook = loginFacebook;
		ctrl.loginGoogle = loginGoogle;
		ctrl.loginLocal = loginLocal;
		ctrl.registerLocal = registerLocal;
		ctrl.checkLoginStatus=checkLoginStatus;
		//ctrl.loginStatus=checkLoginStatus();
		//checkLoginStatus();

        ctrl.loginForm = {};

		function loginFacebook() {
			facebookLoginService.login();
		}

		function loginGoogle() {
			googleLoginService.login();
		}

		function loginLocal() {
            localLoginService.login(ctrl.loginForm);
    	}

        function registerLocal() {
            localLoginService.register(ctrl.registerForm);
        }











    	function checkLoginStatus() {
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
    	}
    }
    
})();