// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('LoginCtrl', LoginCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/login/..."
// ------------------------------------------------------------

LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/login.html"
// ------------------------------------------------------------

function LoginCtrl(facebookLoginService, googleLoginService, localLoginService) {

  var ctrl = this;
  ctrl.loginFacebook = loginFacebook;
  ctrl.loginGoogle = loginGoogle;
  ctrl.loginLocal = loginLocal;

  function loginFacebook() {
  	facebookLoginService.login();
  }

  function loginGoogle() {
  	console.log("Login Google");
    // googleLoginService.login();
  }

  function loginLocal() {
  	console.log("Login Local");
    // localLoginService.login();
  }

}
