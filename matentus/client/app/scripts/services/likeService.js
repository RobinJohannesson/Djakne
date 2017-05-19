
// ------------------------------------------------------------
//  Like Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var likeService = function ($http) {

		var api = localStorage.getItem('matentusServer') + '/api';

		var state = {};
		state.likes = [];

		refresh();

		function getUserLikes(){
			$http({
				method: 'GET',
				url: api + '/products/userlikes',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')},
			})
				.then(function(response){
				if (response.status == 200){
					setLikes(response.data);
				}
				else {
					console.log("Failed to load your likes.");
				}
			})

		}

		function likeProduct(id) {
			console.log("Likes product: " + id);
			var token = localStorage.getItem('matentustoken');
			$http({
				method: 'POST',
				url: api + '/products/postlike',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')},
				data: {productId: id}
			})
				.then(function(response){
				console.log(response);
				var status = response.status;
				if (status === 200){
					refresh();
				}
				else if (status === 201){
					refresh();
				}
				else if (status === 401){
					console.log("Du måste logga in för att likea produkter");
				}
			})
		}

		function setLikes(likes) {
			state.likes.length = 0;
			state.likes.push.apply(state.likes, likes);
		}

		function getEmailList(id){
			return $http({
				method: 'POST',
				url: api + '/products/getemaillist',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')},
				data: {productId: id}
			})
				.then(function(response){
					return response;
			})
		}


	function refresh() {
		getUserLikes();
	}

	return {
		refresh: refresh,
		likes: state.likes,
		likeProduct: likeProduct,
		getUserLikes: getUserLikes
	};

}

 angular.module('matentusApp')
	.factory('likeService', likeService);

})();
