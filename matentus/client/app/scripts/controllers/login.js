// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('LoginCtrl', LoginCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/login/..."
// ------------------------------------------------------------

LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService', '$scope'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/login.html"
// ------------------------------------------------------------

function LoginCtrl(facebookLoginService, googleLoginService, localLoginService, $scope) {

  var ctrl = this;
  ctrl.loginFacebook = loginFacebook;
  ctrl.loginGoogle = loginGoogle;
  ctrl.loginLocal = loginLocal;

  function loginFacebook() {
  	facebookLoginService.login();
  }

  function loginGoogle() {
  	console.log("Login Google");
    googleLoginService.login();
  }

  function loginLocal($scope) {
  	console.log("Login Local");
    console.log($scope);
    localLoginService.login();
  }

}
