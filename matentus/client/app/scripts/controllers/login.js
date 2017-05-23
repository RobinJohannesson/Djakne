// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService', '$scope', '$http', '$location'];

	function LoginCtrl(facebookLoginService, googleLoginService, localLoginService, $scope, $http, $location$, $window) {

		var ctrl = this;
		ctrl.matentusServer = localStorage.getItem('matentusServer');
		
		ctrl.loginFacebook = loginFacebook;
		ctrl.loginGoogle = loginGoogle;
		ctrl.loginLocal = loginLocal;
		ctrl.checkLoginStatus = checkLoginStatus;
		ctrl.logout=logout;
		ctrl.updateUserInformation = updateUserInformation;
		ctrl.cities = localLoginService.cities;
		ctrl.isOnline = false;
		ctrl.isAdmin = false;

		checkLoginStatus();
		checkAdmin();

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

		function checkLoginStatus() {
			localLoginService.checkLoginStatus()
			.then(function(isOnline) {
				ctrl.isOnline = isOnline;
			});	
		}

		function checkAdmin() {
			localLoginService.checkAdmin() 
			.then(function(isAdmin) {
				ctrl.isAdmin = isAdmin;
			});
		}

		function updateUserInformation() {
			localLoginService.updateUserInformation(ctrl.welcomeForm);
		}
		
		function logout(){
			localLoginService.logout();
		}
	}

})();