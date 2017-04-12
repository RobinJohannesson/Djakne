var connection = require.main.require('./database/connection').connection;
var response = require.main.require('./response/response');

module.exports = {

	get: function(id, res) {
		connection.query('SELECT * FROM categories WHERE id = ?', id, function(error, rows) {
			if(error) return response.serverError(res);
			if(rows.length === 0) return response.notFound(res);
			return res.json(rows[0]);
		});
	},

	getAll: function(res) {
		connection.query('SELECT * FROM categories', function(error, rows) {
			if(error) return response.serverError(res);
			return res.json(rows);
		});
	},

	create: function(data, res) {
		connection.query('INSERT INTO categories (title) VALUES (?)', data, function(error, message) {
			if(error) return response.serverError(res);
			return response.created(res, {'Category-id': message.insertId});
		})
	},

	update: function(data, res) {
		connection.query('UPDATE categories SET title = ? WHERE id = ?', data, function(error, message) {
			if(error) return response.serverError(res);
			if(message.affectedRows === 0) return response.notFound(res);
			return response.updated(res);
		});
	},

	remove: function(id, res) {
		connection.query('DELETE FROM categories WHERE id = ?', id, function(error, message) {
			if(error) return response.serverError(res);
			if(message.affectedRows === 0) return response.notFound(res);
			return response.removed(res);
		});
	}

};