
// ------------------------------------------------------------
// 	Admin Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
    .controller('AdminCtrl', AdminCtrl);

// ------------------------------------------------------------
// 	This controller has access to "services/httpService.js"
// ------------------------------------------------------------

AdminCtrl.$inject = ['$scope', '$location','$routeParams'];

// ------------------------------------------------------------
// 	Variables and functions available to "views/admin.html"
// ------------------------------------------------------------

function AdminCtrl($scope, $location,$routeParams) {

    var ctrl = this;
    ctrl.changeView=changeView;
    // ctrl.test = httpService.categories;
    function changeView(view){
        console.log("t="+view);
        $location.url('/admin'+view);
    }

};



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

