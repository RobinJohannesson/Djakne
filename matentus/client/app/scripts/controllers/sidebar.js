// ------------------------------------------------------------
// 	Sidebar Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('SidebarCtrl', SidebarCtrl);

	SidebarCtrl.$inject = ['categoryService'];

	function SidebarCtrl(categoryService) {

		var ctrl = this;

		ctrl.shouldShowDropdown = false;
		ctrl.toggleDropdown = toggleDropdown;

		function toggleDropdown() {
			ctrl.shouldShowDropdown = ctrl.shouldShowDropdown ? false : true;
		}

	}

})();
