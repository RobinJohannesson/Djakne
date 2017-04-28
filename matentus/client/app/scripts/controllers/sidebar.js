// ------------------------------------------------------------
// 	Sidebar Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('SidebarCtrl', SidebarCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/categoryService.js"
// ------------------------------------------------------------

SidebarCtrl.$inject = ['categoryService'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/navbar.html"
// ------------------------------------------------------------

function SidebarCtrl(categoryService) {

  var ctrl = this;

  ctrl.shouldShowDropdown = false;
  ctrl.categories = categoryService.categories;
  ctrl.toggleDropdown = toggleDropdown;

  function toggleDropdown() {
  	ctrl.shouldShowDropdown = ctrl.shouldShowDropdown ? false : true;
  	console.log(ctrl.shouldShowDropdown);
  }

}
