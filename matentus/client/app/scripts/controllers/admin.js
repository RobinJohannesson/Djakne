
// ------------------------------------------------------------
// 	Admin Controller
// ------------------------------------------------------------

(function () {
	'use strict';

	angular.module('matentusApp')
	.controller('AdminCtrl', AdminCtrl);

	AdminCtrl.$inject = ['$scope', 'adminService', 'uploadService', 'categoryService', 'productService', 'facebookLoginService', 'googleLoginService', 'localLoginService'];

	function AdminCtrl($scope, adminService, uploadService, categoryService, productService, facebookLoginService, googleLoginService, localLoginService) {

		// Kolla om matentustoken finns
		// Om det finns - Skicka till servern och kolla så att användaren är inloggad och är admin. Hämta och visa produkter.
		// Om det inte finns - Visa inga produkter, be användaren att logga in som admin. Led tillbaka till samma sida.

		var ctrl = this;
		ctrl.matentusServer = localStorage.getItem('matentusServer');

		ctrl.manageSuggestionsView = 'views/admin/views/manageSuggestions.html';
		ctrl.manageProductsView = 'views/admin/views/manageProducts.html';
		ctrl.manageCategoriesView = 'views/admin/views/manageCategories.html';
		ctrl.addProductView = 'views/admin/views/addProduct.html';
		ctrl.currentView = ctrl.manageSuggestionsView;

		ctrl.isAdmin = false;
		ctrl.suggestions = adminService.suggestions;
		ctrl.categories = categoryService.categories;
		ctrl.suppliers = productService.suppliers;
		ctrl.keywords = productService.keywords;
		ctrl.products = productService.products;
		ctrl.currentProduct = {};
		ctrl.currentCategory = {};

		ctrl.addProduct = addProduct;
		ctrl.approveProduct = approveProduct;
		ctrl.dismissProduct = dismissProduct;
		ctrl.updateProduct = updateProduct;
		ctrl.deleteProduct = deleteProduct;
		ctrl.addCategory = addCategory;
		ctrl.changeView = changeView;
		ctrl.setCurrentProduct = setCurrentProduct;
		ctrl.setCurrentCategory = setCurrentCategory;
		ctrl.clearCurrentProduct = clearCurrentProduct;
		ctrl.addCategory = addCategory;
		ctrl.updateCategory = updateCategory;
		ctrl.deleteCategory = deleteCategory;
		ctrl.loginFacebook = facebookLoginService.login;
		ctrl.loginGoogle = googleLoginService.login;
		ctrl.loginLocal = localLoginService.login;


		//adminService.refresh();


		// Kontrollera om användaren online - om inte, be den logga in.
		// Kontrollera om användare är admin - om inte, härled till startsida.

		checkLoginStatus();
		checkAdmin();


		function checkLoginStatus() {
			localLoginService.checkLoginStatus()
			.then(function(isOnline) {
				console.log("User online? " + isOnline);
				if(isOnline) {
					ctrl.isOnline = isOnline;
				} else {
					showLoginModal();
				}
			});
		}

		function checkAdmin() {
			localLoginService.checkAdmin()
			.then(function(isAdmin) {
				if(isAdmin) {
					console.log("User is admin? " + isAdmin);
					ctrl.isAdmin = true;
				} else {
					localLoginService.logout();
					showLoginModal();
				}
			});
		}

		function showLoginModal(){
			$('#modal-login').modal('show');
		}

		function setCurrentProduct(product) {
			ctrl.currentProduct = product;
		}

		function setCurrentCategory(category) {
			ctrl.currentCategory = category;
		}

		function changeView(view) {
			ctrl.currentView = view;
		}

		function addProduct() {
			uploadService.upload(ctrl.currentProduct);
			clearProductInput();
		}

		function approveProduct() {
			ctrl.currentProduct.approved = true;
			if(!ctrl.currentProduct.supplier) {
				ctrl.currentProduct.supplier = 'Information saknas';
			}
			adminService.update(ctrl.currentProduct);
		}

		function dismissProduct() {
			ctrl.currentProduct.approved = false;
			adminService.update(ctrl.currentProduct);
		}

		function updateProduct() {
			if(!ctrl.currentProduct.supplier) {
				ctrl.currentProduct.supplier = 'Information saknas';
			}
			adminService.update(ctrl.currentProduct);
		}

		function deleteProduct() {
			adminService.remove(ctrl.currentProduct);
			clearCurrentProduct();
		}

		function addCategory() {
			adminService.addCategory(ctrl.currentCategory);
			clearCurrentCategory();
		}

		function updateCategory() {
			adminService.updateCategory(ctrl.currentCategory);
			clearCurrentCategory();
		}

		function deleteCategory() {
			adminService.deleteCategory(ctrl.currentCategory);
			clearCurrentCategory();
		}

		function clearProductInput() {
			ctrl.currentProduct = {};
			ctrl.form.$setPristine();
			document.getElementById('file').value = null;
			$scope.$broadcast('angucomplete-alt:clearInput');
		}

		function clearCurrentCategory() {
			ctrl.currentCategory = {};
		}

		function clearCurrentProduct() {
			ctrl.currentProduct = {};
		}
	};

})();
