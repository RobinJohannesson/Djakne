
// ------------------------------------------------------------
//  Like Service. All properties of the returned object is
//  reachable for any controller who $inject this service.
// ------------------------------------------------------------

(function () {
	'use strict';

	var likeService = function ($http,productService) {

		var api = localStorage.getItem('matentusServer') + '/api';

		var state = {};
		state.likes = [];

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
					console.log("Failed to load likes.");
				}
			});

		}
        
		function likeProduct(id) {
			var token = localStorage.getItem('matentustoken');
			return $http({
				method: 'POST',
				url: api + '/products/postlike',
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')},
				data: {productId: id}
			})
			.then(function(response){
				var status = response.status;
				if (status === 200){
					refresh();
					productService.refresh();
					productService.getProduct(id);
				}
				else if (status === 201){
					refresh();
					productService.refresh();
					productService.getProduct(id);
				}
				else if (status === 401){
					 $('#modal-login').modal('show');
					console.log("Användaren måste logga in för att kunna gilla produkter.");
				}
			});
		}

		function setLikes(likes) {
			state.likes.length = 0;
			state.likes.push.apply(state.likes, likes);
		}

		function empty() {
			state.likes.length = 0;
		}

		function getEmailList(id) {
			var productId = id;
			return $http({
				method: 'POST',
				url: api + '/products/emaillist/'+productId,
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')}
			})
				.then(function(response){
					if (response.status==200){
						var link = localStorage.getItem('matentusServer')+"/"+response.data;
						console.log(link);
						return link;
					}
				
					else{
						console.log("Fel uppstod!");
					}
			})
		}
        
        function refresh() {
			getUserLikes();
	    }
		
		return {
			refresh: refresh,
			empty: empty,
			likes: state.likes,
			likeProduct: likeProduct,
			getEmailList:getEmailList
		};

	}

 angular.module('matentusApp')
	.factory('likeService', likeService);

})();
