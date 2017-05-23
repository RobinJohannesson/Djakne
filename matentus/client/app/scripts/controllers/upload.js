
// ------------------------------------------------------------
// 	Upload Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('UploadCtrl', UploadCtrl);

	UploadCtrl.$inject = ['$scope', 'categoryService', 'suggestionService'];

	function UploadCtrl($scope, categoryService, suggestionService) {

		var ctrl = this;
		ctrl.matentusServer = localStorage.getItem('matentusServer');

		ctrl.categories = categoryService.categories;
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