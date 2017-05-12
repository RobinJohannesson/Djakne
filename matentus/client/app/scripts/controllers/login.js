// ------------------------------------------------------------
// 	Login Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('LoginCtrl', LoginCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/login/..."
// ------------------------------------------------------------

LoginCtrl.$inject = ['facebookLoginService', 'googleLoginService', 'localLoginService', '$scope', '$http', '$location'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/login.html"
// ------------------------------------------------------------

function LoginCtrl(facebookLoginService, googleLoginService, localLoginService, $scope, $http, $location) {

  var ctrl = this;
  ctrl.loginFacebook = loginFacebook;
  ctrl.loginGoogle = loginGoogle;
  ctrl.loginLocal = loginLocal;
  ctrl.registerLocal = registerLocal;
  
  function loginFacebook() {
  	facebookLoginService.login();
  }

  function loginGoogle() {
  	console.log("Login Google");
    googleLoginService.login();
  }
  
  function loginLocal() {
  	console.log("Login Local");
    //googleLoginService.login();
  }
  
  function registerLocal() {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/register/newuser',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({name: $scope.formLogin.name, email: $scope.formLogin.mail, password: $scope.formLogin.pass})
    })
    .then(function(response){
      var status = response.data.status;
      if (status==0){
        var token=response.data.token;
        localStorage.setItem('matentustoken', token);
        $location.url('/');
      }
    })
    localLoginService.login();
  }

}
