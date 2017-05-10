// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('LoginCtrl', LoginCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/login/..."
// ------------------------------------------------------------

LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService', '$scope', '$http'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/login.html"
// ------------------------------------------------------------

function LoginCtrl(facebookLoginService, googleLoginService, localLoginService, $scope, $http) {

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

  function loginLocal() {
  	console.log("Login Local");
    console.log($scope);
    console.log($scope.formLogin);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/register/newuser',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({user: $scope.formLogin.name, email: $scope.formLogin.mail, password: $scope.formLogin.pass})
    })
    .then(function(response){
      console.log(response);
    })
    localLoginService.login();
  }

}
