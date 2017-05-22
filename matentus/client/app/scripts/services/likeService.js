
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
				console.log("Get user likes: ");
				console.log(response);
				if (response.status == 200){
					setLikes(response.data);
				}
				else {
					console.log("Failed to load your likes.");
				}
			});

		}
        
        function getProductLikes(id){
            console.log(id);
            console.log("likeservice, getproductlikes");
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/products/productlikes/' + id,
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')},
                params: {productId: id},
            })
            .then(function(response) {
				console.log("Get product likes: ");
				console.log(response);
                if (response.status == 200){
                    return response.data;
                }
                else {
                    console.log(response);
                    console.log("Kunde inte ladda in mängden produkt likes");
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
			var productId=id;
			console.log(productId);
			return $http({
				method: 'POST',
				url: api + '/products/emaillist/'+productId,
				headers: { 'Authorization':'JWT '+ localStorage.getItem('matentustoken')}
			})
				.then(function(response){
					console.log(response);
					if (response.status==200){
						console.log(response.data);
					}
				
					else{
						console.log("Fel uppstod!");
					}
			})
		}
        
        function refresh() {
			getUserLikes();
			getProductLikes();
	    }
		
		return {
			refresh: refresh,
			likes: state.likes,
			likeProduct: likeProduct,
			getUserLikes: getUserLikes,
            getProductLikes: getProductLikes,
			getEmailList:getEmailList
		};

	}

 angular.module('matentusApp')
	.factory('likeService', likeService);

})();
