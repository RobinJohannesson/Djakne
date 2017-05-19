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
		ctrl.getLoginStatus=getLoginStatus;
		ctrl.getUserType=getUserType;
		ctrl.isOnline=false;
		ctrl.isAdmin=false;
		ctrl.checkLoginStatus();

		ctrl.loginForm = {};

		function loginFacebook() {
			facebookLoginService.login();
			
		}

		function loginGoogle() {
			googleLoginService.login();
			ctrl.checkLoginStatus();
		}

		function loginLocal() {
			localLoginService.login(ctrl.loginForm);
			ctrl.checkLoginStatus();
		}

		function registerLocal() {
			localLoginService.register(ctrl.registerForm);
		}

		function checkLoginStatus() {
			localLoginService.checkLoginStatus()
				.then(function(response) {
				if (response.status){
					ctrl.isOnline=true;
					if(response.data.isAdmin){
						ctrl.isAdmin=true;
					}

				}
			}
					 );	
		}

		function getLoginStatus() {
			return ctrl.isOnline;
		}

		function getUserType() {
			return ctrl.isAdmin;

		}
	}

})();