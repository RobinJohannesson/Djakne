angular
    .module('matentusApp', [
	'ngResource',
	'ngRoute',
	'angucomplete-alt'
	])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/products.html',
                controller: 'ProductsCtrl',
                controllerAs: 'ctrl'
            })
            .when('/products/suggest', {
                templateUrl: 'views/upload.html',
                controller: 'UploadCtrl',
                controllerAs: 'ctrl'
            })
            .when('/products/:id', {
                templateUrl: 'views/product.html',
                controller: 'ProductCtrl',
                controllerAs: 'ctrl'
            })
            .when('/:category_title/:category_id', {
                templateUrl: 'views/products.html',
                controller: 'ProductsCtrl',
                controllerAs: 'ctrl'
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin.html',
                controller: 'AdminCtrl',
                controllerAs: 'ctrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'ctrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'LoginCtrl',
                controllerAs: 'ctrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .when('/404', {
                templateUrl: 'views/error/404.html',
            })
            .otherwise({
                redirectTo: '/'
            });

        localStorage.setItem('matentusServer', 'http://localhost:3000');

}]);
