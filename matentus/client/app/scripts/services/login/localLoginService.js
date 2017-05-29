// --------------------------------------------------------------
//  Local Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
    'use strict';

    var localLoginService = function ($http, $window, likeService) {

        var api = localStorage.getItem('matentusServer') + '/api';
        var isOnline = false;

        var state = {};
        state.cities = [];

        getCities();

        var login = function(user) {
            console.log("Trying to login");
            $http({
                method: 'POST',
                url: api + '/login/email',
                data: user
            })
            .then(function(response) {
                console.log(response);
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
                showWrongPassword();
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
            localStorage.setItem('matentustoken', '');
            isOnline = false;
            $window.location.reload();
            likeService.empty();
        }
        
        function saveToken(token, isNewUser) {
            localStorage.setItem('matentustoken', token);
            isOnline = true;
            likeService.refresh();
            if(!isNewUser) {
                $window.location.reload();
            }
        }

        function showWelcomeModal() {
            $('#modal-welcome').modal('show');
        }
        
        function showWrongPassword() {
            $('#loginError').show();
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
            cities: state.cities
        };

    };

    angular.module('matentusApp')
        .factory('localLoginService', localLoginService);

})();