
// ------------------------------------------------------------
// 	Upload Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('UploadCtrl', UploadCtrl);

	UploadCtrl.$inject = ['$scope', 'categoryService', 'productService', 'uploadService'];

	function UploadCtrl($scope, categoryService, productService, uploadService) {
		var ctrl = this;

		ctrl.categories = categoryService.categories;
		ctrl.suppliers = productService.suppliers;
		ctrl.upload = upload;
		ctrl.product = {};

		function upload() {
			uploadService.upload(ctrl.product);
			clearInput();
		}

		function clearInput() {
			ctrl.product = {};
			ctrl.form.$setPristine();
			document.getElementById('image').value = null;
			$scope.$broadcast('angucomplete-alt:clearInput');
		}
	}

})();