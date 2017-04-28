
// ------------------------------------------------------------
// 	Main Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('MainCtrl', MainCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/login/..."
// ------------------------------------------------------------

// MainCtrl.$inject = [''];

// ------------------------------------------------------------
// 	Variables and functions available to "views/main.html"
// ------------------------------------------------------------

function MainCtrl() {

  var ctrl = this;
  ctrl.test = "Main page";
  
}

