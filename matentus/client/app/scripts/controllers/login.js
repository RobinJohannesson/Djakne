// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService', '$scope', '$http', '$location'];

	function LoginCtrl(facebookLoginService, googleLoginService, localLoginService, $scope, $http, $location$,$window) {

		var ctrl = this;
		ctrl.loginFacebook = loginFacebook;
		ctrl.loginGoogle = loginGoogle;
		ctrl.loginLocal = loginLocal;
		ctrl.checkLoginStatus = checkLoginStatus;
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
				console.log("Is online? " + isOnline);
				ctrl.isOnline = isOnline;
			});	
		}

		function checkAdmin() {
			localLoginService.checkAdmin() 
			.then(function(isAdmin) {
				console.log("Is admin? " + isAdmin);
				ctrl.isAdmin = isAdmin;
			});
		}
	}

})();