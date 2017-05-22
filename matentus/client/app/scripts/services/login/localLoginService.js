
// --------------------------------------------------------------
//  Local Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
    'use strict';

    var localLoginService = function ($http, $window, adminService, likeService) {

        var api = localStorage.getItem('matentusServer') + '/api';

        var isOnline = false;
        var isAdmin = false;

        var login = function(loginForm) {
            $http({
                method: 'POST',
                url: api + '/login/email',
                data: loginForm
            })
            .then(function(response){
                switch(response.status) {
                    case 200:
                        console.log("An existing user was logged in with email.");
                        saveToken(response.data.token);
                        console.log(response.data.token);
                        break;
                    case 201:
                        console.log("A new user was created and logged in with email.")
                        saveToken(response.data.token);
                        console.log(response.data.token);
                        break;
                    default:
                        console.log("Something happened when logging in with email: " + status);
                }
            })
            .catch(function(error) {
                console.log("Something happened when logging in...");
                console.log(error);
            });
        };


        var checkLoginStatus = function() {
            return  $http({
                        method: 'GET',
                        url: api + '/login/status',
                        headers: {'Authorization':'JWT '+ localStorage.getItem('matentustoken')}
                    })
                    .then(function(response) {
                        return true;
                    })
                    .catch(function(error) {
                        if(error.status === 401)  {
                            return false;
                        }
                    });
        };

        var checkAdmin = function() {
            return  $http({
                        method: 'GET',
                        url: api + '/login/status',
                        headers: {'Authorization':'JWT '+ localStorage.getItem('matentustoken')}
                    })
                    .then(function(response) {
                        return response.data.isAdmin;
                    });
        };

        var logout = function() {
            removeToken();
        }
        
        function saveToken(token) {
            localStorage.setItem('matentustoken', token);
            isOnline = true;
            $window.location.reload();
            likeService.refresh();
            adminService.refresh();
        }

        function removeToken() {
            localStorage.setItem('matentustoken', '');
            isOnline = false;
            $window.location.reload();
            likeService.refresh();
            adminService.refresh();
        }


        return {
            login: login,
            checkLoginStatus: checkLoginStatus,
            checkAdmin: checkAdmin,
            isOnline: isOnline,
            logout: logout
        };

    };

    angular.module('matentusApp')
        .factory('localLoginService', localLoginService);

})();