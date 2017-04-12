module.exports = {

	serverError: function(res, data) {
		if(!data) data = {"Message": "500 - Server Error"};
		res.status(500).send(data);
	},

	notFound: function(res, data) {
		if(!data) data = {"Message": "404 - Not Found"};
		res.status(404).send(data);
	},

	created: function(res, data) {
		if(!data) data = {"Message": "201 - Created."};
		res.status(201).send(data);
	},

	updated: function(res, data) {
		if(!data) data = {"Message": "200 - Updated."};
		res.status(200).send(data);
	},

	removed: function(res, data) {
		if(!data) data = {"Message": "200 - Removed."};
		res.status(200).send(data);
	}

};
