
// --------------------------------------------------------------
//  Local Login Service. All properties of the returned object
//  is reachable for any controller who $inject this service.
// --------------------------------------------------------------

(function () {
	'use strict';

	var localLoginService = function ($http) {
		var isOnline = false;
		
		var login = function(){
			console.log("local login service");
		};
		return {
			login: login
		};

	};

	angular.module('matentusApp')
	.factory('localLoginService', localLoginService);
	
})();