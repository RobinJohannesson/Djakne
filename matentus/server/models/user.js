"use strict";

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define("User", {  
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		street: {
			type: DataTypes.STRING,
			allowNull: true
		},
		zipcode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		timestamps: false,
		underscored: true,
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Like)
			}
		}
	});

	return User;
};