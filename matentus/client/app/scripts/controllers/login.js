// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService', 'userService', 'likeService', '$scope', '$http', '$location'];

	function LoginCtrl(facebookLoginService, googleLoginService, localLoginService, userService, likeService, $scope, $http, $location, $window) {

		var ctrl = this;
		ctrl.matentusServer = localStorage.getItem('matentusServer');

		ctrl.thisUser = {};
		ctrl.getThisUser = getThisUser;

		ctrl.loginFacebook = facebookLoginService.login;
		ctrl.loginGoogle = googleLoginService.login;
		ctrl.loginLocal = localLoginService.login;
		
		ctrl.checkLoginStatus = checkLoginStatus;
		ctrl.logout=logout;
		ctrl.updateUserInformation = userService.updateUserInformation;
		ctrl.newUserInformation=newUserInformation;
		ctrl.cities = localLoginService.cities;
		ctrl.isOnline = false;
		ctrl.isAdmin = false;

		checkLoginStatus();
		checkAdmin();

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
				if(isOnline) {
					likeService.refresh();
				}
			});	
		}

		function checkAdmin() {
			localLoginService.checkAdmin() 
			.then(function(isAdmin) {
				ctrl.isAdmin = isAdmin;
			});
		}
		
		function newUserInformation(user){
			
			if(!user.city){
				$('#cityError').show();
			}
			
			else{
				user.city=user.city['title'];
				userService.updateUserInformation(user);
				
			}
			
		}
		
		
		function logout(){
			ctrl.isOnline = false;
			localLoginService.logout();
		}
	}

})();