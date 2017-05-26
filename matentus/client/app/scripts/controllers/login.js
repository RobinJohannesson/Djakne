// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService', 'userService', '$scope', '$http', '$location'];

	function LoginCtrl(facebookLoginService, googleLoginService, localLoginService, userService, $scope, $http, $location, $window) {

		var ctrl = this;
		ctrl.matentusServer = localStorage.getItem('matentusServer');

		ctrl.thisUser = {};
		ctrl.getThisUser = getThisUser;
		
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

		function getThisUser() {
			userService.getThisUser()
			.then(function(user) {
				ctrl.thisUser = user;
			});
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
			console.log("Update user info...");
			console.log(ctrl.thisUser);
			userService.updateUserInformation(ctrl.thisUser);
		}
		
		function logout(){
			localLoginService.logout();
		}
	}

})();