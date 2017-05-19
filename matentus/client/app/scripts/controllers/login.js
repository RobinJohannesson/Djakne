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
		ctrl.checkLoginStatus = checkLoginStatus;
		ctrl.getLoginStatus=getLoginStatus();
		ctrl.getUserType=getUserType();
		
		ctrl.checkLoginStatus();

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
            localLoginService.checkLoginStatus();
        }
		
		function getLoginStatus() {
			localLoginService.getLoginStatus();
		}
		
		function getUserType() {
			localLoginService.getUserType();
			
		}
    }
    
})();