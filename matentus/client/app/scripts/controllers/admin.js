// ------------------------------------------------------------
// 	Admin Controller
// ------------------------------------------------------------

(function () {
    'use strict';

    angular.module('matentusApp')
        .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$scope', 'adminService', 'suggestionService', 'categoryService', 'likeService', 'productService', 'localLoginService'];

    function AdminCtrl($scope, adminService, suggestionService, categoryService, likeService, productService, localLoginService) {

        var ctrl = this;
        ctrl.matentusServer = localStorage.getItem('matentusServer');

        //------------------------------------------------------------------------
        //	About views
        //------------------------------------------------------------------------

        ctrl.manageSuggestionsView = 'views/admin/views/manageSuggestions.html';
        ctrl.manageProductsView = 'views/admin/views/manageProducts.html';
        ctrl.manageCategoriesView = 'views/admin/views/manageCategories.html';
        ctrl.manageUsersView = 'views/admin/views/manageUsers.html';
        ctrl.addProductView = 'views/admin/views/addProduct.html';
        ctrl.currentView = ctrl.manageSuggestionsView;

        //------------------------------------------------------------------------
        //	About current data state
        //------------------------------------------------------------------------

        ctrl.currentOrder = '';
        ctrl.reverseOrder = false;
        ctrl.currentUser = {};
        ctrl.currentProduct = {};
        ctrl.currentCategory = {};
        ctrl.users = adminService.users;
        ctrl.suggestions = adminService.suggestions;
        ctrl.categories = categoryService.categories;
        ctrl.products = productService.products;
        ctrl.keywords = productService.keywords;
        ctrl.suppliers = productService.suppliers;

        //------------------------------------------------------------------------
        //	Actions available to Admin user interface
        //------------------------------------------------------------------------

        ctrl.addSuggestion = addSuggestion;
        ctrl.addProduct = addProduct;
        ctrl.approveProduct = approveProduct;
        ctrl.dismissProduct = dismissProduct;
        ctrl.updateProduct = updateProduct;
        ctrl.deleteProduct = deleteProduct;
        ctrl.setCurrentProduct = setCurrentProduct;
        ctrl.clearCurrentProduct = clearCurrentProduct;

        ctrl.updateUser = updateUser;
        ctrl.deleteUser = adminService.deleteUser;
        ctrl.getUsersOfCurrentProduct = getUsersOfCurrentProduct;
        ctrl.setCurrentUser = setCurrentUser;
        ctrl.clearCurrentUser = clearCurrentUser;
        ctrl.getEmailList = getEmailList;

        ctrl.addCategory = addCategory;
        ctrl.updateCategory = updateCategory;
        ctrl.deleteCategory = deleteCategory;
        ctrl.setCurrentCategory = setCurrentCategory;
        ctrl.clearCurrentCategory = clearCurrentCategory;

        ctrl.orderBy = orderBy;
        ctrl.changeView = changeView;
        ctrl.refresh = refresh;

        checkLoginStatus();
        checkAdmin();

        //------------------------------------------------------------------------
        //	Authorization
        //------------------------------------------------------------------------

        function checkLoginStatus() {
            localLoginService.checkLoginStatus()
                .then(function (isOnline) {
                    if (isOnline) {
                        checkAdmin();
                    } else {
                        showLoginModal();
                    }
                });
        }

        function checkAdmin() {
            localLoginService.checkAdmin()
                .then(function (isAdmin) {
                    if (isAdmin) {
                        ctrl.isAdmin = true;
                        refresh();
                    } else {
                        localLoginService.logout();
                        showLoginModal();
                    }
                });
        }

        function showLoginModal() {
            $('#modal-login').modal('show');
        }

        //------------------------------------------------------------------------
        //	Manage products and suggestions
        //------------------------------------------------------------------------

        function addSuggestion() {
            suggestionService.addSuggestion(ctrl.currentProduct);
            clearProductInput();
        }

        function addProduct() {
            if (ctrl.currentProduct.approved) {
                adminService.addProduct(ctrl.currentProduct);
            } else {
                suggestionService.addSuggestion(ctrl.currentProduct);
            }
            clearProductInput();
        }

        function approveProduct() {
            ctrl.currentProduct.approved = true;
            adminService.updateProductOrSuggestion(ctrl.currentProduct);
        }

        function dismissProduct() {
            ctrl.currentProduct.approved = false;
            adminService.updateProductOrSuggestion(ctrl.currentProduct);
        }

        function updateProduct() {
            adminService.updateProductOrSuggestion(ctrl.currentProduct);
        }

        function deleteProduct() {
            adminService.deleteProductOrSuggestion(ctrl.currentProduct);
        }

        function setCurrentProduct(product) {
            clearProductInput();
            ctrl.currentProduct = product;
        }

        function clearProductInput() {
            clearCurrentProduct()
            ctrl.form.$setPristine();
            document.getElementById('file').value = null;
        }

        function clearCurrentProduct() {
            ctrl.currentProduct = {};
        }

        //------------------------------------------------------------------------
        //	Manage categories
        //------------------------------------------------------------------------

        function addCategory() {
            adminService.addCategory(ctrl.currentCategory);
        }

        function updateCategory() {
            adminService.updateCategory(ctrl.currentCategory);
        }

        function deleteCategory() {
            adminService.deleteCategory(ctrl.currentCategory);
            clearCurrentCategory();
        }

        function setCurrentCategory(category) {
            ctrl.currentCategory = category;
        }

        function clearCurrentCategory() {
            ctrl.currentCategory = {};
        }

        //------------------------------------------------------------------------
        //	Manage users
        //------------------------------------------------------------------------

        function updateUser(id) {
            adminService.updateUser(id)
                .then(function () {
                    getUsersOfCurrentProduct();
                });
        }

        function getUsersOfCurrentProduct() {
            var id = ctrl.currentProduct.id;
            if (!id) {
                adminService.getAllUsers();
            } else {
                adminService.getUsersOfProduct(id);
            }
        }

        function getEmailList() {
            likeService.getEmailList(ctrl.currentProduct.id);
        }

        function setCurrentUser(user) {
            ctrl.currentUser = user;

        }

        function clearCurrentUser() {
            ctrl.currentUser = {};
        }

        //------------------------------------------------------------------------
        //	General
        //------------------------------------------------------------------------

        function changeView(view) {
            ctrl.currentView = view;
        }

        function orderBy(property, reverse) {
            ctrl.currentOrder = property;
            ctrl.reverseOrder = reverse;
        }

        function refresh() {
            clearCurrentProduct();
            clearCurrentCategory();
            clearCurrentUser();
            adminService.refresh();
        }
    };

})();
