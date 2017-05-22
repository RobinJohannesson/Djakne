
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
            .then(function(response) {
                var isNewUser = false;
                switch(response.status) {
                    case 200:
                        saveToken(response.data.token);
                        break;
                    case 201:
                        saveToken(response.data.token);
                        isNewUser = true;
                        break;
                    default:
                        console.log("Something happened when logging in with email: " + status);
                }
                return isNewUser;
            })
            .then(function(isNewUser) {
                if(isNewUser) {
                    showWelcomeModal();
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

        var updateUserInformation = function(user) {
            $http({
                method: 'PUT',
                url: api + '/users',
                headers: { 'Authorization':'JWT ' + localStorage.getItem('matentustoken') },               
                data: user,
                transformRequest: angular.identity,
            })
            .then(function(response) {
                console.log("Update user information response: ");
                console.log(response);
            })
            .catch(function(error) {
                errorHandler(error);
            });
        }
        
        function saveToken(token) {
            localStorage.setItem('matentustoken', token);
            isOnline = true;
            //$window.location.reload();
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

        function showWelcomeModal() {
            console.log("Visa welcome modal");
            $('#modal-welcome').modal('show');
        }

        return {
            login: login,
            checkLoginStatus: checkLoginStatus,
            checkAdmin: checkAdmin,
            isOnline: isOnline,
            logout: logout,
            updateUserInformation: updateUserInformation
        };

    };

    angular.module('matentusApp')
        .factory('localLoginService', localLoginService);

})();