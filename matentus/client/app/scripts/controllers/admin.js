
// ------------------------------------------------------------
// 	Admin Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('AdminCtrl', AdminCtrl);

	AdminCtrl.$inject = ['adminService', 'categoryService'];

	function AdminCtrl(adminService, categoryService) {

		var ctrl = this;

		ctrl.manageSuggestionsView = 'views/admin/views/manageSuggestions.html';
		ctrl.manageProductsView = 'views/admin/views/manageProducts.html';
		ctrl.manageCategoriesView = 'views/admin/views/manageCategories.html';
		ctrl.addProductView = 'views/admin/views/addProduct.html';
		ctrl.currentView = ctrl.manageSuggestionsView;

		ctrl.suggestions = adminService.suggestions;
		ctrl.categories = categoryService.categories;
		ctrl.currentProduct = {};
		ctrl.currentCategoryTitle = '';

		ctrl.accept = accept;
		ctrl.update = update;
		ctrl.remove = remove;
		ctrl.changeView = changeView;
		ctrl.setCurrentProduct = setCurrentProduct;

		function setCurrentProduct(product) {
			ctrl.currentProduct = product;
			setCurrentCategoryTitle();
		}

		function setCurrentCategoryTitle() {
			var category = ctrl.categories.find(function(category) {
				return category.id === ctrl.currentProduct.category_id;
			})
			if(category) {
				ctrl.currentCategoryTitle = category.title;
			}
		}

		function changeView(view) {
			ctrl.currentView = view;
		}

		function accept() {
			ctrl.currentProduct.approved = true;
			console.log(ctrl.currentProduct);
			adminService.update(ctrl.currentProduct);
		}

		function update() {
			adminService.update(ctrl.currentProduct);
		}

		function remove() {
			adminService.remove(ctrl.currentProduct);
		}
	};

})();



/*


$scope.one = true; // setting the first div visible when the page loads
$scope.two = false; // hidden
$scope.three = false; // hidden

// Now have three functions that change the ng-show based on the click
$scope.showOne = function (){
  $scope.one = true;
  $scope.two = false;
  $scope.three = false;
}

$scope.showTwo = function (){
  $scope.one = false;
  $scope.two = true; // now show this one
  $scope.three = false;
    console.log("her")
}

$scope.requests = function($scope){
    console.log("hej")
};

*/
/*
$scope.addProduct = function($scope){
    $scope.view = '/views/addProduct.html';
};

function changeProduct(){
    $("#admin_manage_product").css("display", "block");
    $("#admin_request").css("display", "none");
    $("#admin_categories").css("display", "none");
    $("#admin_add_product").css("display", "none");
};
function manageCategory(){
    $("#admin_categories").css("display", "block");
    $("#admin_request").css("display", "none");
    $("#admin_manage_product").css("display", "none");
    $("#admin_add_product").css("display", "none");
};*/

