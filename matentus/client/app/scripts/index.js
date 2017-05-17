angular
.module('matentusApp', [
	'ngResource',
	'ngRoute',
	'angucomplete-alt'
	])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
	.when('/:category/:category_id', {
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
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'ctrl'
	})
	.when('/404', {
		templateUrl: 'views/error/404.html',
	})
	.otherwise({
		redirectTo: '/'
	});


    // --------------------------------------------------------------------
    //  Facebook Login - This code should be moved somewhere else...
    // --------------------------------------------------------------------


    window.fbAsyncInit = function() {
    	FB.init({
    		appId      : '636938996509987',
    		xfbml      : true,
    		version    : 'v2.9'
    	});
    	FB.AppEvents.logPageView();
    };

    (function(d, s, id){
    	var js, fjs = d.getElementsByTagName(s)[0];
    	if (d.getElementById(id)) {return;}
    	js = d.createElement(s); js.id = id;
    	js.src = "//connect.facebook.net/en_US/sdk.js";
    	fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}]);