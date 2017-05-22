
// ------------------------------------------------------------
// 	Upload Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('UploadCtrl', UploadCtrl);

	UploadCtrl.$inject = ['$scope', 'categoryService', 'productService', 'suggestionService'];

	function UploadCtrl($scope, categoryService, productService, suggestionService) {
		var ctrl = this;

		ctrl.categories = categoryService.categories;
		ctrl.suppliers = productService.suppliers;
		ctrl.keywords = productService.keywords;
		ctrl.upload = upload;
		ctrl.product = {};

		function upload() {
			suggestionService.addSuggestion(ctrl.product);
			clearInput();
		}

		function clearInput() {
			ctrl.product = {};
			ctrl.form.$setPristine();
			document.getElementById('file').value = null;
			$scope.$broadcast('angucomplete-alt:clearInput');
		}
	}

})();