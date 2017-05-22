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
		ctrl.loginFacebook = loginFacebook;
		ctrl.loginGoogle = loginGoogle;
		ctrl.loginLocal = loginLocal;
		ctrl.checkLoginStatus = checkLoginStatus;
		ctrl.updateUserInformation = localLoginService.updateUserInformation;
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
				console.log("From login.js - User is online: " + ctrl.isOnline);
			});	
		}

		function checkAdmin() {
			localLoginService.checkAdmin() 
			.then(function(isAdmin) {
				ctrl.isAdmin = isAdmin;
				console.log("From login.js - User is admin: " + ctrl.isAdmin);

			});
		}
	}

})();