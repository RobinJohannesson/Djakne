// ---------------------------------------------------------------------
//	Directive that keeps track of currently selected file in file input
// ---------------------------------------------------------------------

(function () {
	'use strict';

	angular
	.module('matentusApp')
	.directive('fileModel', fileModel);

	fileModel.$inject = ['$parse'];


	function fileModel($parse) {
		var directive = {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					})
				})
			} 
		};
		return directive;
	}

})();