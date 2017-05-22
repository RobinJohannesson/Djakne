
// --------------------------------------------------------------
//  Local Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
    'use strict';

    var localLoginService = function ($http, $window, adminService, likeService) {

        var api = localStorage.getItem('matentusServer') + '/api';
        var isOnline = false;

        var state = {};
        state.cities = [];

        getCities();

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
                        saveToken(response.data.token, isNewUser);
                        break;
                    case 201:
                        isNewUser = true;
                        saveToken(response.data.token, isNewUser);
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

        var updateUserInformation = function(welcomeForm) {
            $http({
                method: 'PUT',
                url: api + '/users',
                headers: { 'Authorization':'JWT ' + localStorage.getItem('matentustoken')},               
                data: welcomeForm,
            })
            .then(function(response) {
                $window.location.reload();
            })
            .catch(function(error) {
                errorHandler(error);
            });
        }
        
        function saveToken(token, isNewUser) {
            localStorage.setItem('matentustoken', token);
            isOnline = true;
            likeService.refresh();
            adminService.refresh();
            if(!isNewUser) {
                $window.location.reload();
            }
        }

        function removeToken() {
            localStorage.setItem('matentustoken', '');
            isOnline = false;
            $window.location.reload();
            likeService.refresh();
            adminService.refresh();
        }

        function showWelcomeModal() {
            $('#modal-welcome').modal('show');
        }

        function getCities() {
            $http({
                method: 'GET',
                url: api + '/cities'
            })
            .then(function(response) {
                setCities(response.data);
            });
        }

        function setCities(cities) {
            state.cities.length = 0;
            state.cities.push.apply(state.cities, cities);
        }

        var errorHandler = function(response) {
            console.log(response);
        };    

        return {
            login: login,
            checkLoginStatus: checkLoginStatus,
            checkAdmin: checkAdmin,
            isOnline: isOnline,
            logout: logout,
            updateUserInformation: updateUserInformation,
            cities: state.cities
        };

    };

    angular.module('matentusApp')
        .factory('localLoginService', localLoginService);

})();