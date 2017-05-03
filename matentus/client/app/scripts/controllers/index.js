angular
  .module('matentusApp', [
    'ngResource',
    'ngRoute'
  ])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'ctrl'    
      })
      .when('/:category/:subcategory/:subcategory_id', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'ctrl' 
      })
      .when('/postproduct', {
        templateUrl: 'views/postProduct.html',
        controller: 'ProductCtrl',
        controllerAs: 'ctrl' 
      })
      .when('/admin/', {
       templateUrl: 'views/admin.html',
       controller: 'AdminCtrl',
       controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });


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